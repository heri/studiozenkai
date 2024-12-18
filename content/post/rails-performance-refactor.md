
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

Let's do an exercise together to see how we can improve its performance. The exercise assumes you have monitoring and logging and you judged this endpoint worth optimizing.

## 1. **Pagination**

Fetching all products can be expensive if the database is large. Let's reduce the number of records fetched at once.
```ruby
def index
  @products = Product.page(params[:page]).per(20)
  render json: @products
end
```
It is set at 20 in this example, but it can be a parameter or a different value, based on customer needs.

## 2. **Preload Associations**
Eager load reviews and categories reduce queries. Calculating `average_rating` for each product causes N+1 queries. Mapping categories for each product adds additional N+1 queries.

```ruby
def index
  @products = Product.includes(:reviews, :categories).page(params[:page]).per(20)
  render json: @products
end
```
Now it is down to three database queries.

## 3. **Database Calculations**

Whatever Ruby uses for calculating averages, database level calculation will be faster. There is no type casting, no formatting etc.

```ruby
def index
  @products = Product
    .select("products.*, AVG(reviews.rating) as average_rating")
    .joins(:reviews)
    .group("products.id")
    .includes(:categories)
    .page(params[:page]).per(20)
  
  render json: @products.as_json(methods: :average_rating)
end
```

## 4. **Custom Serializer**

There is inefficient JSON rendering due to multiple transformations.

Let's use serializers for optimized JSON rendering.
```ruby
def index
  ...
  render json: ProductSerializer.new(@products).serializable_hash
end

# app/serializers/product_serializer.rb
class ProductSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :average_rating

  attribute :categories do |product|
    product.categories.map(&:name)
  end
end
```

There is the added benefit of having `ProductSerializer` which can be easily re-used

## 5. **Cache Results**
For frequently accessed rows, we can cache average rating and category data for products.

```ruby
def index
  @products = Product.includes(:categories).page(params[:page]).per(20)
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

## 6. **Batch Queries for Associations**

We can write more efficient queries for associations

```ruby
def index
  @products = Product.page(params[:page]).per(20)
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

## 7. **Background Processing for Heavy Calculations**

Average is easy. In real-world applications, we have to calculate fees, totals, and metrics that are far from trivial. Calculations can be precomputed and stored.

```ruby
class Product < ApplicationRecord
  after_save :update_average_rating

  def update_average_rating
    self.average_rating = reviews.average(:rating)
    save!
  end
end
```

## 8. **Indexing**

If you haven't already, make sure to add indexes on joined or searched columns

```ruby
# db/migrate/add_indexes_to_reviews_and_categories.rb
add_index :reviews, :product_id
add_index :categories_products, [:category_id, :product_id]
```

## Bonus

Depending on your use case, aggregation logic can be offloaded to an external API. That external API could run on a mean, blazing fast stack (such as [Crystal](https://studiozenkai.com/post/crystal-high-performance/) or [Rust](https://studiozenkai.com/tags/rust/)), or can be allocated more powerful hardware.

Make sure to profile performance. An external API will add networking time so you can end with worse response times.

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