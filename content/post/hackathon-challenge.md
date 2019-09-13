+++
date = "2019-09-13T15:30:20-04:00"
title = "48 Hours Climate Change hackathon"

+++

I am participating this weekend in the AI Climate Change [Hackathon](https://www.facebook.com/events/443903349789312/), and I will jot down here my notes and progress. Here is the event pitch:

"Join us along with the other talented and diverse participants, supported by leading mentors in their fields who will come together to collaborate to attempt to address climate change and its impacts on communities and ecosystems. We hope to begin to achieve real positive impact in 48 hours using AI. We are also announcing 4 AI challenges: Plant Village Challenge, Extreme Weather Prediction, Climate-Related Risk Assessment, and Predict the Weather in Montréal."

This sounds like a recipe to attract ecologists, students, and dreamers alike. It tells very little about technologies, specific goals and metrics, or even datasets, which are key in AI.

Neverthless, it should be a good opportunity to implement an idea I had recently. 

A while ago, I used the iOS app [Gyroscope](https://gyrosco.pe), which excelled in giving you a picture of your daily health. The app has good integration with data providers like Garmin or Apple Health but it was also good at recognizing activities such as walking, biking or taking public transit. At the end of the day, a screen that I loved showed total energy expenditure, heart rates, sleep patterns and other core metrics.

![Health tracking with gyroscope](https://brainhub.eu/blog/wp-content/uploads/2017/07/gyroscope-famous-react-native-app.jpeg "Health tracking with gyroscope")

Fitness apps are good into telling you if your work-out was good, but Gyroscope was great into showing you if were getting more healthier, overall.

It's this ability to track daily actions and giving you a 10,000 feet global view that I want to render, in the case of climate change. Imaging taking an Uber, then getting your Starbucks, having a hamburger at lunch later, then finally biking home. The app will then sum up in a screen what are the positive/negative impact of these actions. You can then share this easily on social media or just bask in what you've done that day :)

One can even imagine, that given enough users and patterns, you could be recommended specific products or actions that improves your "climate change balance".

Now, if it sounds like I am a green die-hard activist -- I am not at all. This is just 48 hours of my time trying to build an app that can help regular people in their daily life.

Now, a bit of background:

* I did [outcomereference](http://outcomereference.com), which is able to correlate a food to diseases, and vice-versa. This project is still a work in progress, as it needs more precise statistical modeling, a course that was in my bottom 10 in engineering. But above all, it works and you can trust the results in any page.
* I built a couple of self-driving RC vehicles, based on the donkeycar OSS. So I can do supervised learning, reinforcement learning, computer vision and more.
* I also did a lot of AI modeling to know that you have to be either lucky or have an army of supervisers to get an accurate AI model. In 98% of cases, reverting to regressions, mathematical modeling, or just brute-forcing with a database works better than an "AI model"
* I did a dozen of web apps, back-end, API or full-stack
* I can do design and UI but it will generally be poor. I'm a sucker for slick designs so will need help on this

For this project, I foresee a few problems: 

* What are the datasets? and if there aren't any supplied, where do we get them?
* Can you actually use an accurate AI model?
* What are the metrics for positive/negative climate change actions? I can think of CO2, but it can be also CH4, or harmful substances (pesticides) and plastics generated
* How do you present something that's simple and elegant for everyone?
* Is there even time to train a model and get an accurate model?

As you can see, there are data, back-end, design challenges for this and I hope to write down here regularly the challenges, analysis, the range of solutions, and also what was the course taken.

To be continued. If you want to contact, I'm on twitter @[heri](https://twitter.com/heri) or heri [at] studiozenkai.com

--

Friday 13 Sep 2019 - 6pm 

Yoshua Bengio outlines how A.I. can be used, specifically optimizing current operations of heavy industry or governments. I think he refers to work done at Element.AI, a commercial entity which works with big businesses. There is no mention of invididual or consumer applications. He also mentions climate and weather modeling, although I am not sure how this can be done in 48 hours. The other presenter, Sasha Luccioni, discusses the actual climate costs of Machine Learning work, and various applications with G.A.N. (??)

There is also a random guy who talks about hugging trees and children and taking a sabbatical leave. A true Montrealer, if you ask me :)

It's also the first time I go to the MILA / Element.AI building and it reminds me of Facebook/Google/Apple campuses. The building has a surprisingly massive footprint.

On my side, I am *searching public datasets* that could be used, freely or with a license. [CoolClimate](https://coolclimate.org/calculator) has a calculator that uses CO2 for climate change costs with categories in travel, home, food and shopping. It would be possible to deduce activity costs with this calculator, and get sparse data that could be used as a foundation for the app. Another [calculator](https://www.footprintcalculator.org) has a better design for everyday users, however it would be hard to "reverse engineer" this. 

There are also [various papers](https://www.academia.edu/Documents/in/Ecological_Footprint) in ecological footprints but with my experience with outcomereference, I just know these would take forever to read, assimilate and use. 

I am also reading an extensive [study modeling GHG production[(https://www.cdp.net/en/investor/ghg-emissions-dataset)] and their statistical framework. I think there are *some very good lessons* here for consumer/invidual applications.

I also found a few datasets such as [OpenAMEE](https://github.com/OpenAMEE/datasets) [CO2 Emissions data](https://github.com/Mzkarim/Exploring--CO2-Emission-Data-) . The first one by OpenAMEE and various forks are especially interesting.

At this point however, it is clear there is no extensive public database of ecological footprint of your daily actions.

The other part of the challenge was *finding metrics* to qualify daily actions. Interestingly, the CoolClimate calculator seems to correlate all activities with CO2 production. Isn't using CO2 simplistic? Or is it really a standard? I hope I meet a climate change specialist to confirm or deny this tomorrow. Personally, I see "climate change" as just one of the many modern issues that needs to be tackled. I'm not sure that pesticides, radioactivity or microplastics contribute to climate change, but I see them as plagues that need action. I would even rather see see climate change and floods rather than having our lands filled with microplastics and chemicals everywhere. Maybe, CO2, CH4, harmful chemicals can be different components and responses, much alike calories, sleep patterns and mind are presented in different screens in Gyroscope.

To note, so far, I've received a lot of positive responses from Nicole Fu, on the other side of the ocean. She's working on [The Crowd](https://thecrowd.charity) app, which compels you to pledge positive climate change. I'll have to look into this tomorrow am. I've got also a lot of virtual cheers on Twitter and Facebook. This is great and my fuel so I will keep up the work and the research.