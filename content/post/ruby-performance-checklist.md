+++
date = "2017-05-08T10:35:26-04:00"
title = "Ruby Performance checklist"

+++

I shipped many applications, using a variety of frameworks, through [my current 1 year challenge](http://studiozenkai.com/challenge/) or startups. Ruby issues include low performance, such as servers needing more RAM, not able to sustain large traffic, or slow rendering. Since this is a recurring issue, here is a checklist to help developers get their Ruby app faster:

## Code complexity

Ruby's simplicity and ease of use allows beginners and experienced developers alike to ship features in record time. Good for business, otherwise bad for code quality. For instance, many :

* create too many instance variables and statements. This means more allocations and more database calls. Often the variables are not even used.
* add too many loops. This exponentially decreases performance. Do you need yet another `each` or collection?
* use too many gems. There are many nice gems to make you life easier. Few however think if they need yet another gem. Don't bloat your app!

Less complex code is more readable and brings in most cases more performance. I like to use [rubycritic](https://github.com/whitesmith/rubycritic) to bring more sanity. Another alternative is [rubocop](https://github.com/bbatsov/rubocop). There are also third-party services like skylight to show you object allocation. Pick your tool, and focus efforts on the most complex methods. You don't have to write terse one-liners. However there is a always a happy middle ground that will satisfy developers and product owners.

## Database calls

ActiveRecord or Sequel makes life easier for Ruby developers. Perhaps too easy. If left unchecked, you find yourself doing hundreds of queries for a single page. Get the blog post, get the post comments, then get the comment users, and then their pictures. And why not the list of people who liked, or favorited the post. And...

The first and easy solution is stop doing N+1 queries. Use a gem like [bullet](https://github.com/flyerhzm/bullet) or a service like [scoutapp](https://scoutapp.com/) to hunt N+1 queries. These allow you to set alert on Slack, or any similar messenging service, in case of a N+1 query. See an alert as a failure that needs to be solved before the end of the day!

Another (and less easy) path is start learning and loving Postgres (or MySQL, if that's your database of choice). This will take time, but you will then be able to start using advanced joins, custom types such as ranges, arrays, json, spatial types, or good full-text searches. Please investigate to make best use of existing resources.

## DevOps for Ruby

Even if you have a dedicated DevOps or an infrastructure engineer in your team, I advise generally Ruby developers to learn how to deploy, manage and scale servers. This will allow you to:

* learn load balancing or reverse proxy cache. See into Nginx scripting, through Lua or Ruby, to dramatically increase performance.
* learn how to sustain good performance, even with limited hardware or service disruptions
* learn the pros and cons of passenger vs puma vs unicorn
* learn how to commit and deploy without service uninterruption.

## The art of caching

Caching can be done at multiple levels: front server, database, app, assets etc.

One of my favorite is ETag. Everyone wants to use Redis but smart use of etags lets you render pages in 40ms or less. It's hard to beat. In the example of the blog post, the `updated_at` column lets us bypass rendering or data loading. ETag also works for API calls so do not be shy in using ETag!

Another low-hanging fruit is caching. Most often, rendering a collection with a partial takes most of the time for a page render. Using `cached: true` increases performance. Once you have a store for caching, you can also store results of complex queries.

In this section, Redis will be your best friend. It's stable as a rock, will ingest anything you throw at it, is extensible and super-fast. With a bit of work, you can serve requests from 100kreq/s to 1mreq/s.

## The impression of speed

They say performance is in the eye of beholder. A static page means slow performance for users. However doing the following will make them think otherwise: 

* Using frameworks like React allows them to load instantly pages. The visitor can be "distracted" by a loading animation and/or various parts of the page moving. You can also let them enter data on a form while data loads.
* On select browsers such as Chrome or Firefox, service workers let users continue using the page, even if the server is slow or even unreachable. Performance is then only related to the performance of the front-end app.
* Supplement data can be loaded later. In the example of the article, we get the page title and content text in one query. However, comments can be loaded only when the user scrolls down to the relevant section. In a similar way, you can defer content requiring heavy calculations.

There are many other UI patterns to give the impression of speed.

## Offloading

Business goals might require a maximum render time. In this case, you can offload complex processing to a job server, most often Sidekiq/Redis. You can for example use this job server

* To send emails and notify users
* To work on the database, such as calculations, data processing, data import and export
* To process media, such as encoding videos, resizing images
* and generally any job that might slow down your main app

A drawback is that a job might fail. Or data might have changed between the job creation and job processing. Sidekiq is also not as reliable as Redis. Overall, data offloading might confuse users by presenting obsolete data - leading them to reload pages, spam customer service, or just quit. Make sure to test!

## Sub-optimization

When I have done all the above, with lean methods, smart use of caching, and a good UI, I might still be unsatisfied with Ruby performance.

It is possible to optimize key parts of your application by using C or Rust code. For example, the [fast_blank](https://github.com/SamSaffron/fast_blank) gem makes blank? statements 20x faster. ['oj'](https://github.com/ohler55/oj) is a JSON parser written in C.

In a similar way, [faster_path](https://github.com/danielpclark/faster_path), written in Rust, can optimize file loading. There is a also the newer [Helix](https://github.com/tildeio/helix) gem, that I haven't tested yet, to easily add Rust to your Rails application.

Make sure to test extensively (esp. unit tests)!

## Do you really need Rails?

Most companies dealing with poor Ruby performance use Ruby on Rails. Ruby on Rails is a heavyweight, the hungry yokozuna that will eat any available RAM. Yet in many cases, we don't need all the Active Support methods or everything that Active Record gives.

Did you know that [roda](https://github.com/jeremyevans/roda), a micro Ruby framework, is faster than Phoenix, Play (a scala framework) and can be [as fast as nodejs](https://www.techempower.com/benchmarks/previews/round14/#section=data-r14&hw=ph&test=query)? [Hanami](http://hanamirb.org/) is another framework that will deliver superior performance compared to Rails.

Here's how I've used a standalone Roda app or Hanami, in parallel to a Rails app:

* json search results for the application. roda outputs a db query to json. These are sent to a React/Angular front-end
* embedding content. Bloggers and users looking to embed an object on their site or social media are served by roda
* building a simple/minimalistic admin area
* etc.

I have also used other frameworks such as Phoenix framework or in rare occasions Lapis (which uses OpenResty/nginx) or ExpressJs. Phoenix lies on top of the Erlang VM and is almost impossible to kill. Scheduling background processing jobs is nice experience compared to Rails - stress-free and more natural. However the language is not as expressive as Ruby and you find yourself writing more lines (!). Like Phoenix, Lapis is another high-performance framework written in Lua, however the community is quite small. You can also check out golang frameworks such as beego. Not bad, however I would use a go framework only on select projects.

## What next?

In my experience, it is hard to write a definitive performance guide that will work for most applications. A few applications require just a bit of front-end UI work solve all performance issues (i.e. add a spinner gif and everyone's happy). Others require hand-crafted SQL queries. Sometimes, it's just about beefing up server hardware. Use tools like scout-apm, skylight or newrelic. Work on the low-hanging fruits and then move up.

If you are looking for performance ideas, I advise taking one of your legacy apps and try to increase performance by 3x or 10x within a 48H hackathon. This exercise will force you to work on creative solutions and will teach you valuable technics for working applications later on.

If you want to discuss, feel free to contact me on [Twitter](http://twitter.com/heri) or email heri@studiozenkai.com or comment on the [HN post](https://news.ycombinator.com/item?id=14299690)