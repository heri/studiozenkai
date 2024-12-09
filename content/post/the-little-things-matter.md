+++
date = "2023-03-12T10:35:26-04:00"
title = "Little Math Routines"
tags = ['software', 'ruby', 'rust', 'performance']
+++

Programmers are attracted to big challenges, perhaps comparing themselves to Ed Hillary and Tenzig Norgay ascending Mount Everest. It brings prestige inside and outside the company, and opens them new doors.

While big challenges are worth it, and I encourage everyone to go outside of their comfort zone regularly, little things also matter. It is easy to overlook small calculations, variable naming, or quick queries, assuming that these will make little differences and it is not worth the (potential) conflict with the code author.

The truth is that complacency leads to lower quality, and over time, it will lead to performance issues, tech debt, and ultimately customers will tell you about frozen pages or inconsistencies in their experience.

If we take the example of Ruby on Rails, it is easy to add features and get a concept out of the door. It also very easy to add algorithms with O(n²) complexity, or query the database in a loop, or add yet another file that duplicates the functionality of another file. The framework forgives often "misteps" when it shouldn't.

For a project that required mathematical and statistical calculations, we had an intermediate developer who converted to Ruby what was available online. Pages took more than 20 seconds to load. Most senior programmers would tell you to pre-calculate results in evening jobs, or use Redis caching. Rather cliché, right? I would have approved but user interviews indicated to me the need for real-time results. This feature was not much on the overall project (3 points while we have already done 250+), and most teams would compromise, but I knew this would lead later to bigger issues. I took upon myself to rewrite the key parts in Rust. It is [on github as Little Math Routines](https://github.com/heri/little_math_routines). 

Here is how to use it for Haversine distance:
```Ruby {class="my-class" id="rb-codeblock" lineNos=inline tabWidth=2}
require 'LittleMath'

math = LittleMath.new
coord1 = [40.7128, -74.0060] # New York City
coord2 = [34.0522, -118.2437] # Los Angeles

distance = math.haversine_distance(coord1, coord2)
puts "The distance between NYC and LA is #{distance.round(2)} km"
```
Rust's trigonometric calculations use `std::f64` and are highly optimized. Using `Little Math Routines` is 2 to 5x faster, depending on the number of coordinate paris being processed.

Or for linear regression:
```Ruby {class="my-class" id="rb-codeblock" lineNos=inline tabWidth=2}
x_values = [1.0, 2.0, 3.0, 4.0]
y_values = [10.0, 20.0, 30.0, 40.0]

model = math.linear_reg(x_values, y_values)

# Extract coefficients
intercept = model[0]
coefficient = model[1]

puts "Linear Regression Model: y = #{coefficient}x + #{intercept}"

# Predict values
predicted_y = coefficient * 5.0 + intercept
puts "Predicted value for x = 5.0: #{predicted_y}"
```
Rust is compiled at a lowered level and has better memory handling. Linear calculations like above is 5 to 10x faster for smaller datasets, but for our project, was up to x23 faster as dataset increased.


The version on Github is toned down compared to the version we implemented. Was it a big challenge? No. It has been done before. Am I going to get prestige or talk about it in a keynote? No. Did these little math routines make a difference on customer experience? Yes. 