+++
date = "2024-11-12T10:35:26-04:00"
title = "Balancing Customer Happiness, Developer Burden and Feature Delivery"
[params]
    math = true
+++

Your most valuable customer is frustrated because features are late. Meanwhile, your engineering team is drowning in overtime, and attrition is climbing. How do you keep customers happy without burning out your team?

To tackle this, I designed the **Weighted Customer Happiness** (WH) and the **Customer-Developer Delivery Index** (DI) - two metrics designed to balance customer priorities and developer well-being.

Together, they help teams balance priorities and reach sustainable success.

**Weighted Customer Happiness (WCH)**

Not all customers are equal. Weighted Customer Happiness factors in customer importance when measuring satisfaction:

 \[
\begin{aligned}
WCH &= \sum_{i=1}^{N}\frac{{S}_i×{W}_i}{N}
\end{aligned}
\]

Where:

* S: satisfaction score for a customer (e.g., NPS, CSAT)
* W: weight based on customer importance (e.g., customer lifetime value, customer engagement, user count)
* N: total customers

Teams should focus relentlessly on WCH. Share it widely. Discuss it at all-hands meetings. Make it part of the culture.

For example, at a B2B SaaS company, we prioritized fixing an analytics issue for Dell, which accounted for one-third of all users. Ignoring Dell would have tanked our WCH—and possibly the business.

This example with Dell is extreme and companies generally have a more balanced distribution, but it demonstrates why focusing on a single customer can make sense.

It is critical that the head of engineering is engaged and identifies features critical to high-value customers. If there is a new feature, ask what is the feedback from the company's most important customers, and how it relates to their pain point. What about bug and performance fixes that improves the life of the most engaged customers? 

**Customer/Developer Delivery Index (CDDI)**

WCH alone is not enough. You also need happy developers doing what they do best. This is where CDDI comes in:

 \[
\begin{aligned}
Customer Developer Delivery Index &= \frac{Delivery Performance}{Burden} &= \frac{F×WCH}{{O}_n + {A}_n + {C}_n}
\end{aligned}
\]

The goal is to increase CDDI over time.

**Breaking down CDDI metrics**

***Features Delivered on Time (F)***

[Strong refinement processes](https://studiozenkai.com/post/necessary-but-not-sufficient/) increases F.

Better tooling and infrastructure help: automated CI/CD, powerful laptops and servers, [use of A.I.](https://studiozenkai.com/post/ai-will-take-your-job-eventually/), great work environment etc.

Optionally, the team can track Quality (Q). Q represents the percentage of features meeting quality standards. Features with defects and customer-reported issues lower Q. Other teams take into account industry metrics. 

 \[
\begin{aligned}
F &= Q x {F}_delivered
\end{aligned}
\]

For example, in a fintech company like NASDAQ, security and privacy are paramount, so even if a team manages to have a high output but a feature has glaring security issues, then F would be equal to 0.

In another project, I worked on a crypto trading platform. One of its revenues stream is to find the best possible trade for its users and other platforms, as soon as possible. So Q was reflected in platform performance.

Those are examples. You will find a SaaS company using other metrics for Q, such as click-through rates.

***Work Hours Overtime (O)***

Overtime is in its broad sense. In its simplest form, it is the number of extra hours spent developing features, beyond previously agreed time. It also includes time spent on rebases, re-opened tickets due to bugs or unclear requirements, production support tickets.

O can be decreased by making sure sprint planning and deadlines are realistic, and accurately logging time spent on features and overtime.

The result is then divided by Omax which is the maximum tolerable overtime.

 \[
\begin{aligned}
{O}_n &= \frac{O}{{O}_max}
\end{aligned}
\]

Overtime reflects work-life balance. A bit of overtime keeps things interesting, but past a certain threshold, you have unhappy teams.

A good example of "interesting overtime" is time spent automating CI/CD or setting up better infrastructure. 

I do not mind spending a couple of days writing a Pulumi script so instead of k8s commands, the team would leverage infrastructure as code. This increases team productivity, and lets them focus on development.

When requirements are not complete and an edge case is discovered in production, the team has to re-open the ticket, work on a fix, and get it to QA. The whole process can take 5 to 10 more time than making sure that all edge cases are accounted for in refinement. O increases, developer satisfation decreases.

***Team Attrition (A)***

Like Overtime above, this is broad. In addition to layoffs or resignations, it also includes team members leaving to another department, medical leaves, or position changes. Why do we count team members changing departments or leaves? Because these are disruptive.

Managing A is collaborative work between everyone. It is important to have a regular pulse of developers through surveys and retrospectives to surface issues.

Attrition is also related to growth opportunities, financial as well as careers. If there are better career prospects elswhere, then Atttrition will go up, regardless of F, O or WCH.

Finally, Attrition correlates to Developer Happiness. Clear goals, autonomy and technical growth increase Developer Happiness, thus decreasing Attrition, while at the same increasing Delivery Performance.

 \[
\begin{aligned}
{A}_n &= \frac{A}{{A}_max}
\end{aligned}
\]

Attrition is usually represented by an annual percentage. If a developer leaves the company and you have 10 developers, then your attrition rate is 0.1 or 10% rate annually. 

The result is then divided by Amax which is the maximum tolerable attrition.

***Cost (C)***

 \[
\begin{aligned}
{C}_n &= \frac{C}{{C}_ideal}
\end{aligned}
\]

Cost is hard and soft compensation, consultation fees, hardware and services costs, as well end of the year party, travel etc.

Once you get the total, then divide by Cideal which is the ideal cost

**Trade-offs**

It is possible for a team to focus temporarily on Delivery Performance. You can increase developer burden to get a feature released before a deadline. You can also spend more time reducing burnout. But both cases are unstainable. There is a trade-off. Great Heads of Engineering will need to work hard to increase Delivery Performance while at the same time decreasing Burden.

**Why It Matters**

In one project, we noticed a spike in overtime and attrition. By revisiting our processes, we reduced attrition from 20% to 5% while maintaining a WCH of 90%. The metrics worked because they showed us where to focus.

Start tracking WCH and CDDI today. Experiment. Refine. Share your results.

And remember: The happiest customers are loyal. But the happiest developers stick around longer — and don’t dream of deleting your repository after hours.