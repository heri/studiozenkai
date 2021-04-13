+++
date = "2021-04-13T10:35:26-04:00"
title = "Troubleshooting a web application"

+++

How do you diagnose a slow web application? What about an unresponsive web application?

Those are questions I asked when interviewing recently developers. The questions are simple to understand yet complex to answer. Many applicants study data structures or various algorithms. Few  have a holistic view of web applications, due to lack of experience or because of niche specializations. They often work on a specific part of a web project, and have little appreciation of work done in back-end, front-end, devops or other areas.

Here are a few answers I expected in case of a slow application.

Monitoring tools is the first step. If there is no monitoring, then install or integrate one of the commercially available tools. Otherwise, it is similar to a doctor guessing what a patient has without doing any history, physical examination let alone blood work. Monitoring should output detailed information on queries as well as exactly the application stack trace. Be aware that certain monitoring tools do not log killed queries, such as gunicorn killing a worker if there is no response after 30 seconds.

A monitoring tool can show you what requests were slow. Malicious scripts can probe your stack at specific times. It is also possible a cron job does millions of queries, thereby impacting the whole userbase. Smart rules deal with this. What we care about are requests coming from genuine, paying users.

A good monitoring tool should also be able to show where in the stack time was spent. Often it is a slow database.

A database can be slow because of low memory. Increasing available RAM allows you to increase max connexions and will also decrease response times. It is also possible the database is on a different network or a different geo region. Lookup into getting the database as close as possible to the applications. The biggest issues in database usage is however the lack of database optimization. Is there proper indexing? Is there redundant data ? Do you have to do a "SELECT *" when often a couple of columns are enough to complete the query? Why are there dozens of requests on the users table when a single query is enough? Here, the KISS (Keep It Simple Stupid) principle should be followed as often as possible. It's not because you can do multiple requests and get millions of rows that you should. I often set myself a budget of 3 to 4 max queries per endpoint.

Algorithms and data algorithms can be slow. With modern programming languages such as Python or Ruby, it is a no brainer to add a loop. The developer will test the feature for 10 data points until a user wants a million data points. Now your loop is computed a million times. Like the database budget of 3 queries above, I set myself a maximum of 7 lines for each endpoint. It is extremely hard to output bloated data structures with such a small budget.

In the same simplicity idea, I have seen developers add layers upon layers of microservices for an endpoint. A user calls Flask, which calls a dictionary, which calls a tensorflow model on a VPN, and then more data structure and more database calls are made . I've also seen S3 calls to dataframe done real-time for a publicly available endpoint. Please make it simple, ideally within the application <-> database pattern.

Of course, it is also possible you are using the wrong libraries. I have done business intelligence queries in Ruby while the same optimization computation would be 10 times faster in Python's libraries (pandas & others). Even within the same programming language, you can pick a buggy, slow and outdated library. Yes it works and you got your pull request approved but the whole team now has to diagnose slow requests for the next 3 months :( Make sure to build on solid foundations.

The application server is the last I am going to diagnose. Having more memory & more processes work. Having the latest Ruby version or Rust version with the performance improvements helps. Remember though they are not going to save you when there is all the bloat above. Perhaps adding a load balancer with a bit replication helps.

When all this is done and not much else can be optimized, it is possible to look at hacks.

An asynchronous job queue is a nice hack. You can acknowledge a user request as quickly as possible, and process the request when you can, taking as much time as you need. It is possible to use a UI element to notify user that the job is being processed.

Adding a redis cache is such a hack. You can have sub-100ms response time with a redis cache.

Adding a CDN can work too. Fastly does that, and it even takes keys.

What about an application that is unresponsive?

First an application can still be available but be so slow that users assume it's dead. I lookup monitoring tools and other steps above to make sure it's not the case.

This is what an application hits, in order:

- domain name servers are queried. It is possible your name servers are dead or your domain name expired
- the host might have issues. Look up their alert page and your account. Even mastodonts like AWS or GCP has issues from time to time.
- your load-balancer or web server (nginx or other) is misconfigured
- your application server (Rails, Flask, Django) did not start. Does it work locally? Does it have the correct env variables or args? Like the above, you can revert to the native configuration to make sure it works, before optimizing it later
- the application server cannot connect to a critical service such as the database. Check up the host, the port, and credentails. Try to connect to bash to the server and then connect to the db
- the application server cannot connect to caching services
- you make the application load a lot of data during its startup phase. The application doesn't find all the files (there's always one missing..), or you forget to add a package to read a specialy binary format and so on.
- the database is empty or was emptied by a team member but needs startup data to actually works.
- there are not enough resources (hard drive space, RAM, etc.). This happens for large applications with user-generated data or/and a sysadmin who didn't setup correct monitoring tools

Fortunately, it is easy to write a bash script to automate checks for all the steps above and pintpoint issues. Additionally, most projects have a sysadmins who will take responsability for this. However, knowing how a web application works won't hurt you.

I hope all the above makes sense and helps you next time you have these issues or get the question. Until then, happy programming!