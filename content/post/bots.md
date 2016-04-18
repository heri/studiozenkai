+++
date = "2016-04-18T10:35:26-04:00"
title = "Business potential of bots"

+++

Upon hearing about Facebook and Microsoft efforts to deploy bot platforms, a friend reacted:

> So bots are a thing now? I programmed bots 20 years ago

He is a successful technology entrepreneur and has developed systems on many platforms. I can understand him. There were tutorials in kids' magazine on writing a "Hello World" bot on MS-DOS 20 years ago. More impressive were the Artificial Intelligence (A.I.) found in games like Warcraft 3 or Command & Conquer. Friends would spend countless nights trying to beat the A.I. in normal difficulty mode. For everyone else, it would be the Clipper found in Microsoft Word. It had personality and would show tips.

At that time, bots and A.I. were rule-based. "If player produces infantry, produce infantry-killing robots". "If user clicks print, show links on how to print". To get user satisfaction, you need to write rules covering all cases, as well as the exceptions. It is a creative and long but easy job.

But Microsoft's clipper or video games AI showed their limits. _Apart from clear cases, bots could not process subtle situations_. Typing a wrong letter would leave the bot stuck for example. Using a different expression would not work.

Twenty years later, bots and A.I. seem to be commercial hype by bored journalists, like 3D movies two years ago. You can reuse old code, add a few words like A.I or "intelligent" in a press release, and get coverage by gullible bloggers. Fast forward a few months and you get millions from investors.

The example is not far-fetched. The majority of startups on Techcrunch do not have true technology innovation. Yet, there is true disruption. Here is why.

## Bots in a mobile world

In East Africa or Asia, there is prevalence of text as user interface. When the West worked on interfaces with lush animation, text messages provides mobile banking and commerce elsewhere.

Text messages are personal and asynchronous. With each text, the other party would get more information and provide even better service. Ultimately, it is a transparent interface that could provide better meaning and deeper relationship.

Text messages is also the most convenient when you are moving. Who has time to admire rich graphics when you are walking on a busy NYC sidewalk?

Text messages allow you also to cut through all the decorum. Sign-up, confirm email, create profile, navigate, search, compare, view criterias, add to favorites, reserve, confirm, add shipping address, add credit card number, add billing address, confirm again. Who has patience for all that? It's the idea of using natural language instead of the artificial constructs of sites and apps. If rich media is more helpful, it is possible to send a link to a picture or a map.

Text messages is also the unifying interface, from the homeless person who is using an old Nokia, the executive with the Thinkpad to the hipster with an iPhone. It is accessible, from power users to disabled groups.

Time is definitively ripe for text as the main interface.

## Advances in Machine Learning

In addition, research in machine learning and especially convolutional neural networks promise better handling of user requests.

Machine Learning feeds real-world data to an algorithm and correlate them to positive or negative outcomes. After testing, the algorithm is able to predict an outcome from new data.

A simple case would be guessing the gender. A researcher would pick features such as weight and height, divide the data in a learning group and a testing group. A good machine learning algorithm would associate a person with shorter height and lesser weight to female gender:

![Gender weight height](/images/rplot.png "[Gender weight height")

*The concept is different from bots decades ago*. Previously, "bots" could only process discrete cases. Machine learning can cover the continuity of cases and even try guessing "out-of-bounds" cases. In the case of gender search, a programmer would write rules. "If height < 65 and weight < 150 pounds, then person is female". But what about a person who is tall and lightweight? A good machine learning would still be able to provide answers.

Mathematically, machine learning is essentially solving an equation and doing a series of matrix multiplications and transpositions. It is known by researchers in universities and proved useful in industry such as signal processing. However, it was never a commercial breakthrough.

Convolutional neural networks, inspired by biological systems, puts multiple layers together and feeds forward data. The idea was interesting but not deemed practical initially due to extreme cost of computation. A traditional machine learning problem already needs fast computers, so how can you find a computer able to process 10, 12, or 30 layers? What changed was the use of graphic user cards, such as NVIDIA's, to get realistic training times. A gaming laptop with the Torch or Caffee libraries can do successful image analysis, natural language analysis or beat go champions in the case of Google's AlphaGo.

Crafting a successful a machine learning algorithm is not trivial. Deep learning is even more complex:

* It takes a PhD or at least a Master of sciences to craft an innovative machine learning algorithm, with prerequisites in computer science and statistics,

* Natural Language Processing needs linguists as well as good English writers

* You need diverse, extensive, and well annotated data. This is seldom the case.

* It is impossible with current technology to process different requests, even with deep learning. For example, you cannot craft a bot good at flower delivery requests that would aslo program your music playlist. This is the main reason Facebook is opening its Messenger Platform so third-parties can develop expertise in niches

* A machine learning project is not guaranteed success, even with significant time or financial investment.

Machine Learning means a focus on "hard" science, and that's something I celebrate. It is also the promise of wider technology accessiblity.

## Business use case

If a convolutional neural network can beat go world champions, you can imagine more practical cases. With enough training data and smart feature selection, you could have:

> New customer: Hello. Can I see the dentist?

> Bot: Hello. Is it urgent?

> New customer: No. I need to extract my wisdom teeths

> Bot: Would Thursday at 10AM be good for you?

> New customer: Huh. I have class at that time. What about 1PM?

> Bot: 1PM at 1500 Maisonneuve bvd West is good. What name should I put the reservation?

> ..

This bot would check in an availability calendar, and provide triage for new customers. Success would depend on past logging of customer interactions and tagging good answers.

An assistant would provide better service, but the person would not be available at 3AM when the tooth hurts.

Here is another case:

> New customer : Hi. I'd like to rent a Tesla this saturday

> Bot: Hello. We have 1. a Tesla P90D for $300 at 9AM at our central downtown location and 2. a Tesla 70D at 10AM at the central station

> New customer : 1 is good!

> ..

This can be extended to most rental businesses, even for Airbnb-like platforms. The bot can go into the database of products and match with availability calendars.

The next level would be crafting messages that would be personal, emotional, friendly and at times more talkative to build rapport, and why not, have users enjoy the service.

This is what I am currently researching. There is already a framework to process user requests and go into a calendar and a SQL database. If you have a database of customer communications annotated with appropriate responses, we can see how bots can automate and increase customer outreach.
