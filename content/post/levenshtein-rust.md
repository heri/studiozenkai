+++
date = "2024-03-01T06:00:00-04:00"
title = "Levenshtein Rust gem"

+++

Given [my Github profile](https://github.com/heri) and [published articles](https://studiozenkai.com/post/), it is clear my favorite programming language is Ruby, an elegant and concise language that brings results, fast.

Raw performance is not Ruby's strengths. It is easy to add loops and O(n2) issues, memory leaks are not rare, so CPU and RAM are quickly hogged.

It is important in your team to raise the bar and make everyone understand the team has a limited budget. Inspect every line carefully, ask why new variables are introduced, and if something simpler is possible. The saying is a cliché but worth here : With great power comes great responsability.

Fortunately, for key points in your application, it is actually possible to use other programming languages known for their raw performance.

In a recent project, I had to calculate the distance between different words so as to find the closest. The Ruby implementation was benchmarked and worked well in development but took more than 30 seconds with the staging data.

We considered Elastic Search as well other services, but these were deemed too complex and added too many constraints for the project.

The solution was implementing the Levenshtein algorithm in Rust, [published as a gem here](https://github.com/heri/levenshtein_rust). It is 15 to 50 times faster than the Ruby equivalent, and works well on many platforms (developer laptops but also on cloud servers). If you are curious, please look at the [distance algorithm here](https://github.com/heri/levenshtein_rust/blob/master/src/lib.rs)

