
+++
date = "2022-10-06T12:00:00-00:00"
title = "Rails Performance exercise"
tags = ['software', 'ruby', 'performance']
+++

Here is a typical Rails endpoint:
<!--more-->

```ruby
class ProductsController < ApplicationController
  def index
    @products = Product.all

    @products = @products.map do |product|
      {
        id: product.id,
        name: product.name,
        average_rating: product.reviews.average(:rating),
        categories: product.categories.map(&:name)
      }
    end

    render json: @products
  end
end
```

It is readable, easy to maintain, uses Rails's native functions such as `average`.

Let's do an exercise together to see how we can improve its performance. The exercise assumes you have monitoring and logging, you judged this endpoint worth optimizing, and CPU/RAM and networking are already optimized.

## 1. **Pagination**

Fetching all products can be expensive if the database is large. Let's reduce the number of records fetched at once.
```ruby
def index
  @products = Product.page(params[:page]).per(20)
  ...
end
```
It is set at 20 in this example, but it can be a parameter or a different value, based on customer needs.

## 2. **Preload Associations**
Eager load reviews and categories reduce queries. Calculating `average_rating` for each product causes N+1 queries. Mapping categories for each product adds additional N+1 queries.

```ruby
def index
  @products = Product.includes(:reviews, :categories).page(params[:page]).per(20)
  ...
end
```
No more N+1 queries


## 3. **Indexing**

If you haven't already, make sure to add indexes on joined or searched columns

```ruby
# db/migrate/add_indexes_to_reviews_and_categories.rb
add_index :reviews, :product_id
add_index :categories_products, [:category_id, :product_id]
```


## 4. **Database Calculations**

Whatever Ruby uses for calculating averages, database level calculation will be faster. There is no type casting, no formatting, no N loops etc.

```ruby
def index
  @products = Product
    .select("products.*, AVG(reviews.rating) as average_rating")
    .joins(:reviews)
    .group("products.id")
    .includes(:categories)
    .page(params[:page]).per(20)
  
  ...
end
```

Many miss db calculations. Any Rails developer know about `count` which translates into `COUNT(*)`, but did you know databases also do `average`, `sum`, `maximum`, `minimum`?

## 5. **Selective Queries**

Tables are often bloated with binary jsons, dozens of columns, and even binaries. Select only needed columns!

```ruby
def index
  @products = Product
    .select("products.id, products.name, AVG(reviews.rating) as average_rating")
    .joins(:reviews)
    .group("products.id")
    .includes(:categories)
    .page(params[:page]).per(20)
  
  ...
end
```


## 6. **Batch Queries for Associations**

We can write more efficient queries for associations

```ruby
def index
  @products = # load products
  product_ids = @products.pluck(:id)

  average_ratings = Review.where(product_id: product_ids).group(:product_id).average(:rating)
  categories = Category.joins(:products).where(products: { id: product_ids }).group_by(&:product_id)

  render json: @products.map do |product|
    {
      id: product.id,
      name: product.name,
      average_rating: average_ratings[product.id] || 0,
      categories: categories[product.id]&.map(&:name) || []
    }
  end
end
```

## 5. **Asynchronous Queries**

Asynchronous queries in Rails 7.0 are executed in a background queries. If you have multiple expensive database queries, the application doesn't have to wait for one query to finish before starting another

```ruby
def index
  # the queries below will be processed in parallel 
  @products = Product.load_async.page(params[:page]).per(20)
  product_ids = @products.pluck(:id)

  average_ratings = Review.load_async.where(product_id: product_ids).group(:product_id).average(:rating)
  categories = Category.load_async.joins(:products).where(products: { id: product_ids }).group_by(&:product_id)

  render json: @products.map do |product|
    {
      id: product.id,
      name: product.name,
      average_rating: average_ratings[product.id] || 0,
      categories: categories[product.id]&.map(&:name) || []
    }
  end
end
```

`load_async` requires `config.active_record.async_query_executor` to [be set](https://guides.rubyonrails.org/v7.0/configuring.html#config-active-record-async-query-executor)

## 9. **Cache Results**
For frequently accessed rows, we can cache average rating and category data for products.

```ruby
def index
  @products = # Product load
  render json: @products.map { |p| p.cached_attributes }
end

# app/models/product.rb
class Product < ApplicationRecord
  def cached_attributes
    Rails.cache.fetch(["product", id, "cached_attributes"], expires_in: 12.hours) do
      {
        id: id,
        name: name,
        average_rating: reviews.average(:rating),
        categories: categories.map(&:name)
      }
    end
  end
end
```

## 10. **Background Processing**

Average is easy. In real-world applications, we have to calculate fees, totals, and metrics that are far from trivial. Calculations can be precomputed and stored.

Background processing also works for large datasets.

```ruby
class Product < ApplicationRecord
  after_save :update_average_rating

  def update_average_rating
    self.average_rating = reviews.average(:rating)
    save!
  end
end
```

## Bonus

Depending on your use case, aggregation logic can be offloaded to an external API. That external API could run on a mean, blazing fast stack (such as [Crystal](https://studiozenkai.com/post/crystal-high-performance/) or [Rust](https://studiozenkai.com/tags/rust/)), or can be allocated more powerful hardware. I have a [more elaborate comparison table on this](https://studiozenkai.com/post/crystal-high-performance/#crystalkemal-vs-typescript).

If you really want to move to an external service, make sure to profile performance. An external API will add networking time so you can end up with worse response times.

```ruby
# Offload aggregation logic to an external API gateway.
def index
  render json: ExternalProductService.fetch_products(page: params[:page])
end
```

Another option is to replace the REST endpoint withh a GraphQL API for selective querying.

```ruby
class Types::ProductType < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :average_rating, Float, null: true
  field :categories, [String], null: true
end

class Resolvers::ProductsResolver
  def resolve(page: 1, per_page: 20)
    Product.includes(:reviews, :categories).page(page).per(per_page)
  end
end

```

Like the external API gateway above, there are pros and cons with GraphQL. Many teams were wooed by the new tech only to backtrack when they see the maintenace costs and added complexity.