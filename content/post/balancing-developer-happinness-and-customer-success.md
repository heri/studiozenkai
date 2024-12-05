+++
date = "2024-11-12T10:35:26-04:00"
title = "Balancing Customer Happiness, Developer Burden and Feature Delivery"
[params]
    math = true
+++

Your most valuable customer is frustrated because the features they need are delayed. Meanwhile, your engineering team is drowning in overtime, and attrition is climbing. How do you deliver value without burning out your team?

To address this, I set up the **Weighted Customer Happiness** (WH) and the **Customer-Developer Delivery Index** (DI) - two metrics designed to balance customer priorities and developer well-being.

This post explores what are these metrics and how different teams can actively use them for sustainable success.

**Weighted Customer Happiness (WCH)**

WCH is key to a company, but not all customers are equal. By weighting satisfaction scores on customer value, we ensure the metric reflect priorities:

 \[
\begin{aligned}
WCH &= \sum_{i=1}^{N}\frac{{S}_i×{W}_i}{N}
\end{aligned}
\]

where:

* S is the satisfaction score for a customer (eg NPS, CSAT)
* W weight based on customer importance (eg customer lifetime value, customer engagement, number of users per account)
* N number of customers

Everyone in the team should be laser focused on increasing this metric. Publish a dashboard. Add it to memos. Share it in Engineering all-hands.

Weighted Customer Happiness is usually measured in %, but another unit can be used, as long as everyone agrees.

To illustrate, in a B2B SaaS company, we had Dell as the biggest customers with 90,000 users, a third of all total users. Dell was a customer for years, and used the service extensively across sales, marketing departments and business units. During a sprint, we realized analytics provided to Dell were incorrect, and knowing their importance to the customer, engineering was all hands to solve the issue, regardless of what developers were working on. Because if Dell was unhappy, the WCH would crash.

This example with Dell is extreme and companies generally have a more balanced distribution, but this demonstrates why a weighted metric makes sense.

It is critical that the head of engineering is engaged and identifies features critical to high-value customers. If there is a new feature planned, ask what is the feedback from the company's most important customers. Can you discuss with marketing how the new features relate to the pain point of each customer? Is it possible to invest in bug and performance fixes that improves the life of your most engaged customers instead? 

**Customer/Developer Delivery Index (CDDI)**

The Customer/Developer Delivery index, or in short CDDI:

 \[
\begin{aligned}
Customer Developer Delivery Index &= \frac{Delivery Performance}{Burden} &= \frac{F×WCH}{{O}_n + {A}_n + {C}_n}
\end{aligned}
\]

where:

* F is **Features Delivered on Time**. Many teams use story points using the Fibonacci sequence
* On is **Work Hours Overtime**. Overtime is here in its broad sense. In its simplest form, it is the number of extra hours spent developing features, beyond the previously agreed time. Additionally, it also includes time spent on rebases, re-opened tickets due to bugs or unclear requirements, production support tickets, and also meetings besides the ones defined in Agile or Scrum methodologies. Overtime reflects work-life balance. A bit of overtime keeps things interesting, but past a certain threshold, you have unhappy teams.
* An is related to **Attrition**. Like Overtime above, this is broad. In addition to layoffs or resignations, it also includes team members leaving to another department, medical leaves, or position changes. Why do we count team members changing departments or leaves? Because if they were truly happy, they would keep working with their team. Keep in mind attrition disturb established processes.
* Cn represents **cost** or cost efficiency. A team can hire pricey consultants to boost F, or pay developers unreasonable amount of money to to reduce A. However the long term viability of the company dictates C be controlled and lowered as much as possible.

The goal is to increase CDDI over time.

It is possible for a team to focus temporarily on Delivery Performance. You can push developers and increase their burden to get a feature released before a deadline. To decrease burden, managers can also choose to voluntarily decrease Delivery Performance. But both cases are not wise long-term. There is a trade-off, and ideally, the experience Head of Engineering knows how to increase Delivery Performance while at the same time decreasing Burden.

**Features Delivered on Time**

Great developers and managers increase F.

A big contributor is making sure [risky epics are properly refined](https://studiozenkai.com/post/necessary-but-not-sufficient/).

Furthermore, better tooling and infrastructure help: Automated CI/CD, faster laptops and servers, [use of A.I.](https://studiozenkai.com/post/ai-will-take-your-job-eventually/), great work environment etc.

Optionally, the team can measure Software Quality (Q). Q represents the percentage of features meeting quality standards. Features with defects and customer-reported issues lower Q. Other teams take into account industry metrics. 

For example, in a company like NASDAQ, security and privacy are paramount, so even if a team manages to have a high output but the feature has glaring security issues, then F would be equal to 0.

In another project, I worked in a crypto trading platform. One of its revenues stream is to find the best possible trade for its users and other platforms, quick. So Performance was measured. 

Those are examples. You will find a SaaS company using other metrics, such as user-friendliness or click-through rates.

 \[
\begin{aligned}
F &= Q x {F}_delivered
\end{aligned}
\]

**Work Hours Overtime**

 \[
\begin{aligned}
{O}_n &= \frac{O}{{O}_max}
\end{aligned}
\]

Overtime can be decreased by making sure sprint planning and deadlines are realistic.

A percentage of total time should always be allocated to tech debt reduction, and automation of repetitive tasks.

Log time spent on features and time spent on any other work

The result is then divided by Omax which is the maximum tolerable overtime

If we take the example of a sprint where F=30 points, developers could spend 2 or 3 hours going back and forth with product and designers, because of requirements gap. If the deployement pipeline is not optimal, the team can also spend 4+ hours rebasing. I have also seen examples where developers have to wait hours for a pipeline to run, or "babysit" their Pull Request in order to get a review app for QA. Other times, it can be hours setting up clusters and resource groups.

As mentioned before, a minimum of Overtime is good. You do want to be able to question Product so once shipped, we do not re-open the ticket. We do want the best (automated) infrastructure. It's when the hours add up, and when the developers spent more time on these tasks than developing that you get negative impacts.

In a previous project, when we noticed overtime spiked and attrition followed, our team revised planning processes. Within 3 months, we reduced attrition from 20% to 5%, while maintaining a Weighted Customer Happiness score of 90%.

**Team Attrition**

 \[
\begin{aligned}
{A}_n &= \frac{A}{{A}_max}
\end{aligned}
\]

Managing Attrition is collaborative work between human resources, management and developers. It is important to have a regular pulse of developers. Monthly retrospectives help surface issues such as tech debt, inadequate processes, collaboration or even people issues.

Attrition is also related to growth opportunities, financial as well as careers. If there are better career prospects elswhere, then Atttrition will go up, regardless of F, O or WCH.

Finally, Attrition correlates to Developer Happiness. Clear goals, autonomy and technical growth increase Developer Happiness, thus decreasing Attrition, while at the same increasing Delivery Performance.

Attrition is usually represented by an annual percentage. If a developer leaves the company and you have 10 developers, then your attrition rate is 0.1 or 10% rate annually. 

The result is then divided by Amax which is the maximum tolerable attrition

**Cost**

 \[
\begin{aligned}
{C}_n &= \frac{C}{{C}_ideal}
\end{aligned}
\]

Cost can be developer pay, consultation fees, hardware and services costs.

Once you get the total, then divide by Cideal which is the ideal cost

Start tracking WCH and CDDI today. Experiment, measure, and share your results!