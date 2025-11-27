+++
date = "2025-11-23T02:00:00-04:00"
title = "Good Software is Boring and High Leverage"
tags = ['software', 'engineering', 'pragmatism', 'roi']
+++

Ask a junior developer what makes software "good", and you’ll hear about Clean Code, SOLID principles, or perhaps 100% test coverage. Ask a hacker, and they might point to a clever one-liner or an obscure algorithm.

But when you are working in a team, various managers, product owners, and business priorities — the definition shifts. We aren't just writing code; we are managing complexity and delivering value.

<!--more-->

There are many metrics for quality, but after working with 6+ development teams, in public and private companies, two criteria have risen to the top of my list: **Predictability** and **Leverage**.

## 1. Predictability (The "Boring" Argument)

Good software is boring.

"Exciting" software is great for hackathons. In production, "exciting" means waking up at 3 AM because a complex microservice mesh deadlocked. "Exciting" means a new hire taking three months to understand the deployment pipeline, and similar time to understand why there is a powerful-yet-brittle service to cache reports.

In a team context, a team cannot innovate if they are constantly firefighting. Good software uses established patterns rather than reinventing the wheel, making debugging predictable for everyone.

### The Console App Test

I recently built a C# integration for Sage 50. The tech stack is about as uncool as it gets: a Console Application running on Windows.

But it is **predictable**.

We didn't try to wrap the Sage SDK in a dockerized microservice running on Kubernetes. We acknowledged the constraints of the environment and built a robust logging system instead.

We spent hours fixing a `TestLogger` in our CI pipeline, not because we love writing test mocks, but to ensure that when the build fails, it tells us *exactly* why.

Likewise, we logged all interactions and steps in a log file, even if it seems redundant for the end-user.

```csharp
// Good software isn't always clever. It's explicit.
// We handle file locking and environment constraints explicitly so 
// the next developer doesn't have to guess why the log file crashed.

public class ConsoleLogger : IDisposable
{
    public ConsoleLogger(bool isTest)
    {
        if (isTest) { _logWriter = null; return; }
        
        // Predictable file naming for easy debugging
        string timeStamp = DateTime.Now.ToString("yyyy_MM_dd_HHmmss");
        _logFileName = $"run_{timeStamp}.txt";
        // ...
    }
}
```

One user commented our application is like an utility, like Docker or homebrew. For many junior developers, this would not be good enough and they will try to spice things up. Here though, I found the comment positive. Docker or homebrew are reliable and do exactly what they are expected to do, not more, not less.

And if this application crashes, the logs tell the story. If we need to deploy, we copy an .exe. It is boring. It is predictable. And because of that, it requires almost zero maintenance from the rest of the team.

## 2. Leverage (The ROI Argument)

Code is a liability. Functionality is an asset.

Great developers understand that their job isn't to write lines of code; it is to solve business problems with the minimum amount of technical debt possible. This is Leverage.

In a team of 7, there is always a temptation for "Resume Driven Development" — using a complex new technology because it looks good on a CV, not because the project needs it. Good software pushes back against this.

### The 4.5 Accountant Multiplier

The C# application I mentioned didn't use AI, Blockchain, or Serverless Edge Functions. It parsed Excel files and poked them into a legacy database.

During the development, we stumbled into naming issues, where account names had typos. For example, a supplier's name would be parsed as "Supplier ABC." while it was registered as "Supplier A.B.C." in Sage 50.


Many developers would push for AI here, or introduce a service that fixes the typos.

We did not do that, because one, results would not be predictible. Two, it introduces a liability that very few can maintain. But the most important reason is that it did not resolve a problem that end-users deemed critical.

The focus instead was turned into solving critical pain points.

All in all, our boring code automated the workload of 4.5 full-time accountants.

That is extreme leverage.

Good software is measured by the ratio of Effort Invested to Value Created.

|Approach|Complexity|Value Created|Verdict|
|---|---|---|---|
|Manual Entry|Low (Human)|"Negative (Slow, error-prone)"|Bad
|Over-Engineered SaaS|High (Microservices)|High (Eventually)|Risky|
|Boring Console App|Low (Simple C#)|High (Immediate)|Good Software|

When we implemented our CI/CD pipeline, we stripped out the expensive security scanning steps because the project is in Alpha and runs in a secure, isolated environment. We didn't pay $30/month for a badge we didn't need. We focused purely on what delivered value: Building, Testing, and Packaging.

## Summary

There are many other qualities that make software "good"—readability, performance, security. But as I look at the software that has survived the longest and provided the most value in my career, it usually shares these two traits.

It is *Predictable*: It doesn't surprise you.

It has *Leverage*: It solves a massive problem with a modest solution.

As engineers, we should strive to be "Force Multipliers" who write "Boring Code." Your product manager will thank you, your team will thank you, and the accountants will definitely thank you.