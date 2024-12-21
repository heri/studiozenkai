+++
date = "2024-05-06T10:35:26-04:00"
title = "Kemal: Performance for Rails Developers"
tags = ['software', 'performance', 'ruby']
+++

Ruby is elegant, expressive, and gets the job done—most of the time. But for high traffic, your monolith feels like a mule dragging a cart uphill. Enter Crystal and the micro framework Kemal: a duo similar to Ruby’s syntax but has C-like performance. It’s a choice that promises speed, simplicity, and a dash of thrill.

## Crystal - Ruby, but compiled

[Crystal](https://crystal-lang.org) borrows from Ruby syntax, and sometimes even improves on it. Its biggest difference is that any code needs to be compiled.  Think of Crystal as Ruby after a mean bootcamp and a strict diet. Here’s why:

- **Ruby-like Syntax**: If you love Ruby, you'll feel right at home with Crystal.
- **Static Typing**: Mistakes? Caught at compile time.
- **Compiled Language**: Being compiled means Crystal moves fast—like a rocket.
- **Concurrency**: Spinning up fibers to handle multiple tasks is not just possible; it’s easy.

Let's consider a simple example where we calculate the Fibonacci sequence. In Ruby:
```ruby
  def fibonacci(n)
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
  end
  
  start_time = Time.now
  puts fibonacci(40)
  end_time = Time.now
  puts "Time taken: #{end_time - start_time} seconds"
```

The Fibonacci algorithm is a CPU bound task and interpreted languages like Ruby are penalized for such tasks. In Crystal:

```crystal
  def fibonacci(n : Int32) : Int32
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
  end
  
  start_time = Time.local
  puts fibonacci(40)
  end_time = Time.local
  puts "Time taken: #{end_time - start_time} seconds"
```

As you can see, the Ruby and Crystal syntax are similar, with minor differences such as compulsory type annotations (`n: Int32` and `: Int32` for return type).

To run ruby
```sh
  studiozenkai heri > ruby fibonacci.rb
  102334155
  Time taken: 13.695118 seconds
```

To run the Crystal equivalent:

```sh
  studiozenkai heri > crystal build fibonacci.cr --release
```

If you had type or algorithmic issues here, then your mistakes will be caught here. For example, if you had the reflex to use `Time.now`, then the compiler would output

```sh
Showing last frame. Use --error-trace for full trace.

In fibonacci.cr:6:21

 6 | start_time = Time.now
                       ^--
Error: undefined method 'now' for Time.class
```

Let's run the crystal binary

```sh
  studiozenkai heri > ./fibonacci
  102334155
  Time taken: 00:00:00.715647000 seconds
```

In this simple example, crystal is ~19 times faster! For larger datasets, the performance gap will increase.

## What is Kemal?

[Kemal](https://kemalcr.com) is a micro web framework for Crystal, inspired by Sinatra. It is designed to be simple and minimalistic

- **Performance**: Like Crystal, Kemal is designed for lightning fast performance.
- **Minimalism**:  No fluff, just essentials. 
- **Familiarity**: If you've used Sinatra or other similar frameworks, you'll find Kemal's API very familiar.

## Profiling

I have used Crystal to optimize bottlenecks in a complex system. For these, the specifications were stable and the inputs/outputs well known. However, the Rails endpoint slowed down our overall numbers. We decide to move one bottleneck to a Kemal microservice.

I have [open sourced a crystal app on Github](https://github.com/heri/crystal_pure_api) which is almost identical to our implementation, except tests, endpoints and fields queried.

To make the case, we profile the endpoint with our existing database and typical inputs. Even if you do not have the same data, you can preview here how profile a Kemal application:

1. **Install Crystal and Benchmarking tools**: Follow the [installation guide](https://crystal-lang.org/install/) to set up Crystal on your machine. On Mac, the easiest is:
   ```sh
   brew install crystal
   # benchmarking
   brew install wrk
   ```

2. **Setup**:
   ```sh
   git clone git@github.com:heri/crystal_pure_api.git
   cd crystal_pure_api
   shards install
   ```

3. **Create a table**
   ```sh
   psql -U postgres
   CREATE DATABASE profiling;
   USE profiling;
   CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   firstName VARCHAR(255)
   );
   ```

4. **Compile and run**
   ```sh
   crystal build main.cr --release
   KEMAL_PORT=3000 ./main
   ```

5. **Profile**:
    In another tab

   ```sh
   wrk -t12 -c400 -d30s http://localhost:3000/users
   ```

We analyzed results and compared performance to our Ruby on Rails app. With the same PostgreSQL db, we measured ~225 rps (requests per second) for Kemal and ~5 rps for Rails, which makes our Kemal microservice 45 times faster!

## Crystal/Kemal vs TypeScript

[TypeScript](https://studiozenkai.com/post/typescript-for-ruby-developers/) is also a good choice when considering performance. [Rust](https://studiozenkai.com/tags/rust/) has even better performance. So how do you compare?

| Feature       | Ruby on Rails                          | Crystal                              | Rust                                 | TypeScript                          |
|----------------------|--------------------------------------------|--------------------------------------|--------------------------------------|-------------------------------------|
| **Performance**      | Moderate                                   | High       | Very High (close to C)           | Moderate to High (depends on V8)    |
| **Syntax**           | Elegant, expressive               | Ruby-like, static typing, compiled   | Strict, low-level, memory safe       | JavaScript with static typing      |
| **Concurrency**      | Limited                     | Built-in fibers                      | Excellent (async/await, threads)     | Good (async, promises)        |
| **Ecosystem**        | Many libraries and gems            | Growing, fewer libraries             | Growing, strong systems programming  | Vast, npm ecosystem                 |
| **Ease of Learning** | Easy to moderate                           | Easy for Ruby developers             | Steep                 | Easy for JS developers      |
| **Use Cases**        | Web apps, prototyping              | High-performance web services        | Systems, performance-critical tasks | Web development, front-end and back-end |
| **Error Handling**   | Runtime errors                             | Compile-time errors                  | Compile-time errors, strict handling | Compile-time errors                 |
| **Memory Management**| Garbage collected                          | Garbage collected                    | Ownership model, no garbage collector| Garbage collected (V8 engine)       |
| **Community Support**| Large, active                              | Smaller, growing                     | Medium                        | Large, active                       |
| **Deployment**       | Easy                        | Easy to moderate (binaries)                      | Moderate (binaries, more setup)      | Easy           |
| **Tooling**          | Excellent          | Essentials (Shards, Kemal)                 | Good (Cargo, Clippy, etc.)      | Excellent|

Crystal and Rust make sense for small, focused services requiring excellent performance. Ruby and Typescript are better for web applications aimed at a diversity of users. 

Do you have to rewrite your monolith overnight? No, Crystal (and TypeScript) are only here to fill in the gaps Rails can’t. They’re lean, mean, and unapologetically fast. As for Rails? Well, it might still have its uses — just not where speed and concurrency matter most.