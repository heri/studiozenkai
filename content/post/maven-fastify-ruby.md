+++
date = "2025-11-03T12:00:00-00:00"
title = "Rails, Legacy DBs and the 80ms timeout: the MAVEN sidecar"
tags = ['personal', 'software', 'ruby']
+++

Given my Github profile and published articles, it is clear my favorite programming language is Ruby. It is elegant, concise, and allows teams to ship features fast.

But Ruby on Rails has a specific philosophy regarding databases: it assumes it owns the connection. A thread checks out a connection, holds it while doing processing data, and releases it when the request is done.

In 99% of cases, this is fine. But in a recent project, we faced a legacy MS SQL database (Wigos) that did not share this philosophy.

<!--more-->

This database supports a high-transaction floor with 1100+ machines generating sessions every second. To survive, it enforces extremely aggressive timeouts. If a connection is idle for more than 80ms, the server kills it.

Our Rails background workers were failing constantly. We saw logs full of `TinyTds::Error: DBPROCESS is dead`.

The root cause was simple: Rails checked out a connection, get initial records, performed a slow calculation or an external API call, and then tried to use the database again to get complimentary data. By then, the database had already hung up.

We needed a solution that decoupled our application logic from the database's strict rules.

## The False Starts

It is important to not jump immediately to writing new code. We looked at infrastructure solutions first.

1. *Aggressive caching*: Caching key data helped the platform for a short amount of time, preventing a complete breakdown. However even copious amount of Redis caching, the errors were still visible from the customer side.

2. *Fine-tuning database connections*: We fine-tuned database connection parameters until we found out it was cutting us around 80-100ms. From there, we fine-tuned timeouts, threads, made a system to retry and verify connections, and more. But like above, it was a short term solution that did not address the root cause and still created code red calls frequently.

3. *Replication (Master/Slave)*: We considered setting up a read-replica where we controlled the timeout settings. However, the database is 4TB. Our sysadmin rightly pointed out that initializing and maintaining a 4TB replica for a few specific queries was using a sledgehammer to crack a nut. This could be a viable long-term solution, but not the one needed *now*.

4. *ETL/Data Warehousing*: We considered dumping data into a warehouse. But oa customer needs to see their recent data, not from 12 hours ago.

5. *Denormalizing*: Half of the queries were for key customer metrics, such as balance and stats. We introduced a few additional tables and columns and sidekiq jobs to fill them, but again, it did not address the need for real-time data, and there too many metrics to make this the only solution.

We needed a surgical approach.

# The Solution: The "Sidecar" Proxy

We decided to build a microservice. Its only job is to act as a relay.

We named it *MAVEN*, named after the Mars orbiter that relays signals from rovers back to Earth.

We chose Node.js (TypeScript) with `Fastify` and `Knex`.

Why Node? Because of its non-blocking I/O model. Unlike Rails, Node doesn't block a thread while waiting. It checks out a connection, executes the query, and immediately releases the connection back to the pool—all within milliseconds. It never holds the connection "hostage" while doing other work.

# The Implementation (and The Errors)

I want junior developers to learn from this: building a service is rarely a straight line. We hit obstacles that looked like bugs but were actually lessons in how different systems talk to each other.

## Lesson 1: The Types Mismatch

Our first endpoint simply queried a customer's reward points. In the database, the ID is a `bigint`.

When we ran the query in Node, the math was wrong. For example, JavaScript's `Number` type cannot safely hold a 64-bit integer. To prevent precision loss, the MS SQL driver returns `bigint` and `money` types as `String`s, not Numbers.

```TypeScript
// bucket.cbu_customer_id comes back as "37084728" (String)
const accountData = result.get(bucket.cbu_customer_id); // Returns undefined

// The Fix:
const accountId = parseInt(bucket.cbu_customer_id, 10);
const accountData = result.get(accountId);
```

Above is just a simplified examples, but we ran into similar issues with binaries and streams.

Takeaway: Never assume types match across languages. Always inspect the raw driver output.

## Lesson 2: The Knex Aggregate Error

We needed to sum up "hidden comps". We wrote what looked like valid Knex code:

```TypeScript
.sum('am_sub_amount as value')
```
The application crashed with `EREQUEST 195: 'sum' is not a recognized built-in function name`. This was confusing. SUM is definitely a SQL function.

The issue was how Knex compiles SQL. It was trying to wrap the alias inside the function, generating invalid SQL like `SUM([col] as [value])`.

TypeScript
```// The Fix
.sum({ value: 'am_sub_amount' })
```
Takeaway: When using an abstraction layer (ORM or Query Builder), you must understand the SQL it generates underneath.

# Performance: The Denominator Effect

Once MAVEN was deployed, we ran benchmarks. The results were confusing at first.

* DB Time: 17ms
* Total Request Time: 108ms
* Overhead: 500%

A 500% overhead looks disastrous. Was Fastify really slow? Should we have used Rust?

No. We were benchmarking from outside the data center. The 90ms difference was simply the time it took the packets to travel over the VPN.

When we bashed into the container and ran curl locally:

* DB Time: 16ms
* Total Request time: 2ms

The framework overhead was effectively zero. The Node.js service was checking out connections, querying, and replying faster than a monitor can draw a single frame.

# Conclusion

Ruby on Rails is still the mothership. It handles the complex business logic, the user interface, and the API integration.

But for this specific task—talking to a hostile, high-performance database—Node.js was the right tool. It solved the 80ms timeout problem not by configuring the database, but by respecting its architecture.

You don't have to rewrite your monolith. You just need to know when to delegate.

For those interested in the technical details, the source code for the connection pooling strategy and the type handling logic is available here.