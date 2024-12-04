+++
date = "2024-11-12T10:35:26-04:00"
title = "Balancing Developer and Customer Happiness for Engineering Teams"
[params]
    math = true
+++

Misalignment between engineering, product and business teams lead to delays, burnout and dissatisfied customers.

There is Internet literature to help out but I have not seen a satisfying framework that makes sense for all parties.

To address this, I use the **Weighted Customer Happiness** (WH) and the **Customer-Developer Delivery Index** (DI).

This post explores what are these metrics and how different teams can actively use them for sustainable success.

**Weighted Happinness (WH)**

Customer happinness is key to a company, but not all customers are equal. By weighting satisfaction scores on customer value (eg customer lifetime value, customer engagement score), we ensure the metric reflect priorities:

 \[
\begin{aligned}
Weighted Happinness &= \sum_{i=1}^{N}\frac{{S}_i×{W}_i}{N}
\end{aligned}
\]

where:

* S is the satisfaction score for a customer (eg NPS, CSAT)
* W weight based on customer importance (eg LTV, customer engagement, number of users)
* N number of customers

For example, an account with 9,000 users will have 3 times more weight in this metric than another with 3,000 users.

Everyone in the team should be laser focused on increasing this metric. Publish a dashboard. Add it to memos. Share it in Engineering all-hands.

Weighted Happinness is usually measured in % (eg 82% average customer happinness), but another unit can be used, as long as everyone agrees.

**Delivery Index (DI)**

The Customer Developer Delivery index

 \[
\begin{aligned}
Delivery Index &= \frac{F×WH}{O + A + C}
\end{aligned}
\]

whwere:

* F is **Features Delivered**. Many teams use story points using the Fibonacci sequence
* O is **Work Hours Overtime**. Overtime is here in its broad sense. In addition to regular overtime, this include time spent on rebases, time worked on re-opened tickets due to bugs or unclear requirements, production support tickets, and also meetings besides the ones defined in Agile or Scrum methodologies. Overtime relfects work-life balance. A minimal amount of overtime is good to keep things interesting, but past a certain threshold, you will have unhappy teams.
* A is **Attrition rate**. Like Overtime above, this is broad. It includes team members leaving to another department, medical leaves, or position changes. Why do we count team members changing departments or medical leaves? Because if they were truly happy, they would have found a way to keep working with their team
* C is **cost** or cost efficiency. A team can hire pricey consultants to boost F, or pay developers unreasonable amount of money to to reduce A. However the long term viability of the company dictates C be controlled and lowered as much as possible.

The goal of a Head of Engineering or an executive is to increase the Delivery Index over time. How?

**Features Delivered**

This metric can be increased by providing better tooling and better infrastructure: Automated CI/CD, faster laptops and servers, use of [chatbots](https://studiozenkai.com/post/ai-will-take-your-job-eventually/), making sure [risky projects are properly refined](https://studiozenkai.com/post/necessary-but-not-sufficient/).

Hiring great developers and better managers also work.

Depending on the team, Quality (Q) could be part of F. Q represents the percentage of features meeting quality standards. Features with defects and customer-reported issues lower Q.

 \[
\begin{aligned}
F &= {F}_deliveredontime x Q
\end{aligned}
\]

**Work Hours Overtime**

Overtime can be decreased by making sure sprint planning and deadlines are realistic. A percentage of total time should always be allocated to tech debt reduction, and automation of repetitive tasks.

This can be as simple as having a shared spreadsheet where devs log their overtime - so you get easily # hours overtime per dev per week

**Weighted Happinness (WH)**

It is critical that the head of engineering is engaged and identifies features critical to high-value customers. If there is a new feature planned, ask what is the feedback from the company's most important customers. Can you discuss with marketing how the new features relate to the pain point of each customer? Is it possible to develop features for more important customers instead?

Make sure to balance feature development with bug and performance fixes that improves the life of your most engaged customers. 

**Team Attrition**

This is collaborative work between human resources, management and business teams. It is important to have a regular pulse of developers. Monthly retrospectives help surface engineering issues such as tech debt, inadequate processes or collaboration issues.

Of course, attrition also correlates to growth opportunities, financial as well as careers. If there are better career prospects in another team or if you pay a developer significanly less than other tech companies, then Atttrition will go up, regardless of F, O or Weighted Happinness.

Attrition is usually represented by an annual percentage. If 1 dev leaves the company and you have 10 developer, then your attrition rate is 0.1 or 10% rate annually

**Cost**

The metric is normalized, based on past history or other teams.