+++
date = "2016-04-18T10:35:26-04:00"
title = "Why bots are a thing now"

+++

Upon hearing about Facebook and Microsoft efforts to deploy bot platforms, a friend reacted:

> So bots are a thing now? I programmed bots 20 years ago

He is a successful technology entrepreneur and has developed systems on many platforms. I can understand him. There were tutorials in kids' magazines on writing a "Hello World" bot on MS-DOS 20 years ago. More impressive were the Artificial Intelligence (A.I.) found in games like Warcraft 3 or Command & Conquer. Friends would spend countless nights trying to beat the A.I. For everyone else, it would be the Clipper found in Microsoft Word. It had personality and would show tips.

At that time, bots and A.I. were rule-based. "If player produces infantry, produce infantry-killing robots". "If user clicks print, show links on how to print". To get user satisfaction, you need to write rules covering all cases, as well as the exceptions. It is a creative and long but easy job.

But Microsoft's clipper or video games AI showed their limits. _Apart from clear cases, bots could not process subtle situations_. Typing a wrong letter would leave the bot stuck for example. Using a different expression would not work. Creative players would find ways to beat the A.I. in ways unseen by video game designers.

Twenty years later, bots and A.I. seem to be commercial hype by bored journalists, like 3D movies two years ago. You can reuse old code, add a few words like A.I or "intelligent" in a press release, and get coverage by gullible bloggers. Fast forward a few months and you get millions from investors.

The example is not far-fetched. The majority of startups on Techcrunch do not have true technology innovation. Yet, there is true disruption. Here is why.

## Bots in a mobile world

In East Africa or Asia, there is prevalence of text as user interface. When the West worked on rich graphic interfaces with lush animation, text messages provides [mobile banking](https://en.wikipedia.org/wiki/M-Pesa), mobile communication and commerce elsewhere.

Text messages are personal and asynchronous. With each text, the other party would get more information and provide even better service. Ultimately, it is a transparent interface with the promise of better meaning and deeper relationship.

Text messages is also the most convenient when you are moving. Who has time to admire rich graphics when you are walking on a busy NYC sidewalk?

Text messages allow you also to cut through all the decorum. Sign-up, confirm email, create profile, navigate, search, compare, view criterias, add to favorites, reserve, confirm, add shipping address, add credit card number, add billing address, confirm again. Who has patience for all that? The idea of using natural language instead of the artificial constructs of sites and apps is indeed more powerful. If rich media is more helpful, it is possible to send a link to a picture or a map.

![Rich interfaces in text communication](/images/buttons.jpg "[Rich interfaces in text communication]")

Text messages is also the unifying interface, from the homeless person who is using an old Nokia, the executive with the Thinkpad to the hipster with an iPhone. It is accessible, from power users to disabled groups.

Time is definitively ripe for text as the main interface.

## Advances in Machine Learning

In addition, research in machine learning [1] and especially [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network) promise better handling of user requests.

Machine Learning feeds real-world data to an algorithm and correlate them with positive or negative outcomes. After testing, the algorithm is able to predict an outcome from new data.

A simple case would be guessing the gender. A researcher would pick features such as weight and height, divide the data in a learning group and a testing group. A good machine learning algorithm would associate a person with shorter height and lesser weight to female gender:

![Gender weight height](/images/rplot.png "[Gender weight height")

*The concept is different from bots decades ago*. Previously, "bots" could only process discrete cases. In the case of gender search, a programmer would write rules. "If height < 65 and weight < 150 pounds, then person is female". But what about a person who is tall and lightweight?  Machine learning can cover the continuity of cases and even try guessing "out-of-bounds" cases.

Mathematically, machine learning is in essence solving an equation and doing a series of matrix multiplications and transpositions. It is known by researchers in universities and proved useful in industry such as signal processing or basic optical character recognition. However, it never had true commercial breakthrough.

Until we had convolutional neural networks, also called deep learning.

Convolutional neural networks, inspired by biological systems, puts multiple layers together and feeds forward data. A layer would process a sub-section of the data, send forward a tiny bit of information, and little by little, the system would "get" the bigger picture. The idea was interesting but not deemed practical initially due to extreme cost of computation. A traditional machine learning algorithm already needs fast computers, so how can you find a computer able to process 10, 12, or 30 layers? What changed mainly was the use of graphic user cards, such as NVIDIA's, to get realistic training times. A gaming laptop with Torch or caffe libraries can do successful image analysis, natural language processing or beat champions in the case of Google's AlphaGo.

Crafting a successful a machine learning algorithm is not trivial. Convolutional neural networks are even more complex:

* There are libraries like TensorFlow which makes the job easier but it still takes a PhD or at least a Master of sciences to craft an innovative algorithm, with prerequisites in computer science and statistics.

* Natural Language Processing needs linguists. Don't forget good grammar!

* If convolutional neral networks can in theory compute any function, you need diverse, extensive, and well annotated data in a field where user requests are repetitive. This is seldom the case.

* It is impossible with current technology to process different requests, even with deep learning. For example, you cannot craft a bot good at pizza delivery requests that would also program your music playlist. This is the main reason Facebook is opening its Messenger Platform so third-parties can develop expertise in niches.

* Yet a machine learning project is not guaranteed success, even with significant time or financial investment.

For example, I can get the following with data pulled from Yelp. However it's as much work as developing a small web app to get natural language from the bot.

![Places recommendation](/images/italian.png "[Places recommendation]")

Yet, machine learning means a focus on "hard" science, and that's something I celebrate. It is also the promise of wider technology accessibility.

## Business use case

If a convolutional neural network can beat go world champions, you can imagine simple and practical cases. With enough training data and smart feature selection, you could have:

![Dentist](/images/bot-dentist.jpg "[bot dentist]")

This bot would check in an availability calendar, and provide triage for new customers. Success would depend on past logging of customer interactions and tagging good answers.

An assistant would provide better service, but the person would not be available at 3AM when the tooth hurts!

In the same way, you could rent a car or an AirBnb. The bot can go into the database of products and match with availability calendars.

If you [add background processes](https://github.com/heri/JuliaBot), you can also design bots searching for optimal prices and would alert users when prices go below a certain treshold. This is where you can imagine use cases not covered by mobile or web apps. Set reminders, check automatically on loved ones, work out project details with team members...

The icing on the cake would be crafting messages that would be personal, emotional, friendly and at times more talkative to build rapport, and why not, have users enjoy the service [2]. Tools like [smooch.io](https://smooch.io/) can help a seamless transition between bot replies and actual responses by a human, without customers knowing it.

This is what I am currently researching. There is already a framework to process user requests and go into a calendar and a SQL database. The proof-of-concept can also access third-party REST APIs. If you have a database of customer communications annotated with appropriate responses, we can work together to see how bots can automate and increase customer outreach.

### Notes

[1] A good introduction to Machine Learning is Andrew Ng's course https://www.coursera.org/learn/machine-learning/home/info?source=phoenixCdp2016AbTest

[2] The movie "Her" portrays well a bot with good rapport. For practical examples, Microsoft is already offering a bot in China http://www.geekwire.com/2015/people-china-love-microsofts-xiaoice-virtual-companion-says-artificial-intelligence/
