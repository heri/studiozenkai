+++
date = "2023-03-12T10:35:26-04:00"
title = "Little Math Routines"

+++

Programmers are attracted to big challenges, perhaps comparing themselves to Ed Hillary and Tenzig Norgay ascending Mount Everest. It brings prestige inside and outside the company, and opens them new doors.

While big challenges are worth it, and I encourage everyone to go outside of their comfort zone regularly, little things also matter. It is easy to overlook small calculations, variable naming, or quick queries, assuming that these will make little differences and it is not worth the (potential) conflict with the code author.

The truth is that complacency leads to lower quality, and over time, it will lead to performance issues, tech debt, and ultimately customers will tell you about frozen pages or inconsistencies in their experience.

If we take the example of Ruby on Rails, it is easy to add features and get a concept out of the door. It also very easy to add algorithms with O(nˆm) complexity, or query the database in a loop, or add yet another file that duplicates the functionality of another file. The framework forgives often "misteps" when it shouldn't.

For a project that required mathematical and statistical calculations, we had an intermediate developer who converted to Ruby what was available online. Pages took more than 20 seconds to load. Most senior programmers would tell you to pre-calculate results in evening jobs, or use Redis caching. Rather cliché, right? I would have approved but user interviews indicated to me the need for real-time results. This feature was not much on the overall project (3 points while we have already done 250+), and most teams would compromise, but I knew this would lead later to bigger issues. I took upon myself to rewrite the key parts in Rust. It is [open sourced on my github](https://github.com/heri/math_rust/tree/master). The version on Github are cleaned up and standardized, but I can tell you our version made calculation 10 times faster on average. Was it a big challenge? No. It has been done before. Am I going to get prestige or talk about it in a keynote? No. Did these little math routines make a difference on customer experience? Yes. 