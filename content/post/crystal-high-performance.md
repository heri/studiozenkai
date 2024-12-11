+++
date = "2024-05-06T10:35:26-04:00"
title = "Crystal and Kemal: Blazing Performance for Rails Developers"
tags = ['software', 'performance', 'ruby']
+++

Ruby is charming. It’s elegant, expressive, and gets the job done—most of the time. But throw in high traffic, and suddenly your graceful app feels like a clunky mule dragging a cart uphill. Enter Crystal and Kemal: a duo that resembles Ruby’s syntax but sprints like C. It’s a setup that promises speed, simplicity, and a dash of thrill.

## Ruby's faster twin

Crystal doesn’t just borrow Ruby’s look; it improves on it. Think of Crystal as Ruby after a hardcode gym membership and a strict diet. Here’s why:

- **Ruby-like Syntax**: If you love Ruby, you'll feel right at home with Crystal.
- **Static Typing**: Mistakes? Caught at compile time.
- **Compiled Language**: Being compiled means Crystal moves fast—like a rocket.
- **Concurrency**: Spinning up fibers to handle multiple tasks is not just possible; it’s easy.

## What is Kemal?

Kemal is a lightning-fast web framework for Crystal, inspired by Sinatra. It is designed to be simple and minimalistic, with even better performance

- **Performance**: Kemal is designed for pure performance.
- **Minimalism**:  No fluff, just essentials. 
- **Familiarity**: If you've used Sinatra or other similar frameworks, you'll find Kemal's API very familiar.

## Profiling

I have used Crystal to optimize bottlenecks in a complex system. For these, the specifications were stable and the inputs/outputs well known. However, the Rails endpoint slowed down our overall numbers. We decide to move one bottleneck to a crystal/kemal microservice.

I have [open sourced a crystal app on Github](https://github.com/heri/crystal_pure_api) which is almost identical to our implementation, except tests, endpoints and fields queried.

To make the case, we used Crystal's built-in tools for profiling your code. Here's how you can profile a Kemal application:

1. **Install Crystal and Benchmarking tools**: Follow the [installation guide](https://crystal-lang.org/install/) to set up Crystal on your machine. On Mac, the easiest is:
   ```sh
   brew install crystal
   # benchmarking
   brew install wrk
   ```

2. **Setup the app**:
   ```sh
   git clone git@github.com:heri/crystal_pure_api.git
   cd crystal_pure_api
   shards install
   ```

4. **Setup the db**
   ```sh
   psql -U postgres
   CREATE DATABASE profiling;
   \c profiling
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

4. **Profile**:
    In another tab

   ```sh
   wrk -t12 -c400 -d30s http://localhost:3000/users
   ```

We analyzed results and compared performance to our Ruby on Rails app. With the same postgres db, we measured ~225 rps (requests per second) for Kemal and ~5 rps for Rails, which makes our Kemal microservice 45 times faster!

Do you have to rewrite your monolith overnight? No, Crystal and Kemal are only here to fill in the gaps Rails can’t. They’re lean, mean, and unapologetically fast. As for Rails? Well, it might still have its uses — just not where speed and concurrency matter most.