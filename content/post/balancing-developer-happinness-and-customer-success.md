+++
date = "2024-11-12T12:00:00-00:00"
title = "Balancing Customer Happiness, Developer Burden and Feature Delivery"
tags = ['software', 'career']
+++

Your most valuable customer is frustrated because features are late. Meanwhile, your engineering team is drowning in overtime, and attrition is climbing. How do you keep customers happy without burning out your team?

I have already written about the [value of an Engineering Manager](/post/understanding-engineering-managers/i), for a single. But what happens for a whole organization?

To tackle this, I designed the **Weighted Customer Happiness** (WCH) and the **Customer-Developer Delivery Index** (CDDI) — two metrics designed to balance customer priorities and developer well-being.

Together, they help teams balance priorities and reach sustainable success.

## Weighted Customer Happiness (WCH)

Not all customers are equal. Weighted Customer Happiness factors in customer importance when measuring satisfaction:

\[
WCH = \sum_{i=1}^{N}\frac{S_i \times W_i}{N}
\]

Where:
- **S**: satisfaction score for a customer (e.g., NPS, CSAT)
- **W**: weight based on customer importance (e.g., customer lifetime value, customer engagement, user count)
- **N**: total customers

Teams should focus relentlessly on WCH. Share it widely. Discuss it at all-hands meetings. Make it part of the culture.

For example, at a B2B SaaS company, we prioritized fixing an analytics issue for Dell, which accounted for one-third of all users. Ignoring Dell would have tanked our WCH—and possibly the business.

This example with Dell is extreme, and companies generally have a more balanced distribution, but it demonstrates why focusing on a single customer can make sense.

It is critical that the head of engineering is engaged and identifies features critical to high-value customers. For new features, ask:
- What is the feedback from the company’s most important customers?
- How does it relate to their pain points?
- What about bug and performance fixes that improve the lives of the most engaged customers?

## Customer-Developer Delivery Index (CDDI)

WCH alone is not enough. You also need happy developers doing what they do best. This is where CDDI comes in:

\[
CDDI = \frac{\text{Delivery Performance}}{\text{Burden}} = \frac{F \times WCH}{O_{\text{normalized}} + A_{\text{normalized}} + C_{\text{normalized}}}
\]

The goal is to increase CDDI over time.

### **Features Delivered on Time (F)**

[Strong refinement processes](https://studiozenkai.com/post/necessary-but-not-sufficient/) increase **F**. Better tooling and infrastructure help: automated CI/CD, powerful laptops and servers, [use of AI](https://studiozenkai.com/post/ai-will-take-your-job-eventually/), great work environments, etc.

Optionally, the team can track **Quality (Q)**. **Q** represents the percentage of features meeting quality standards. Features with defects and customer-reported issues lower **Q**.

\[
F = Q \times F_{\text{delivered}}
\]

For example:
- At a fintech company like NASDAQ, **security and privacy** are paramount. A high output but glaring security issues would set **F** to 0.
- On a crypto trading platform, **Q** reflected platform performance due to its focus on finding the best trades as quickly as possible.
- SaaS companies might use other metrics for **Q**, such as click-through rates.

### **Work Hours Overtime (O)**

Overtime refers to the extra hours spent developing features beyond the agreed time. It also includes:
- Time spent on rebases
- Reopened tickets due to bugs or unclear requirements
- Production support tickets

O can be decreased by making sure sprint planning and deadlines are realistic, and accurately logging time spent on features and overtime.

The result is then divided by Omax which is the maximum tolerable overtime.

\[
O_{\text{normalized}} = \frac{O}{O_{\text{max}}}
\]

Overtime reflects work-life balance. A bit of overtime keeps things interesting, but excessive overtime leads to unhappy teams.

A good example of “interesting overtime” is time spent automating CI/CD or setting up better infrastructure.

I do not mind spending a couple of days writing a Pulumi script so instead of k8s commands, the team would leverage infrastructure as code. This increases team productivity, and lets them focus on development.

When requirements are not complete and an edge case is discovered in production, the team has to re-open the ticket, work on a fix, and get it to QA. The whole process can take 5 to 10 more time than making sure that all edge cases are accounted for in refinement. O increases, developer satisfation decreases.

### **Team Attrition (A)**

Like Overtime above, this is broad. In addition to layoffs or resignations, it also includes team members leaving to another department, medical leaves, or position changes. Why do we count internal moves? Because like resignations, these are disruptive.

Attrition is also related to growth opportunities, financial as well as careers. If there are better career prospects elswhere, then Atttrition will go up, regardless of F, O or WCH.

Attrition impacts team morale and productivity. Developer happiness (clear goals, autonomy, and technical growth) reduces attrition.

\[
A_{\text{normalized}} = \frac{A}{A_{\text{max}}}
\]

Attrition is usually represented by an annual percentage. If a developer leaves the company and you have 10 developers, then your attrition rate is 0.1 or 10% rate annually.

The result is then divided by Amax which is the maximum tolerable attrition.

### **Cost (C)**

Cost includes hard and soft compensation, consultation fees, hardware, services, and perks.

\[
C_{\text{normalized}} = \frac{C}{C_{\text{ideal}}}
\]

Once you calculate total costs, divide by the ideal cost.

## Trade-offs

It's possible to focus temporarily on delivery performance, increasing developer burden to meet deadlines, or reducing burnout. However, both approaches are unsustainable. Great engineering leaders aim to improve delivery performance while reducing the burden.

## Why It Matters

In one project, we noticed a spike in overtime and attrition. By revisiting our processes, we reduced attrition from 20% to 5% while maintaining a WCH of 90%. The metrics worked because they showed us where to focus.

Start tracking WCH and CDDI today. Experiment. Refine. Share your results.

And remember: The happiest customers are loyal. But the happiest developers stick around longer — and don’t dream of deleting your repository after hours.
