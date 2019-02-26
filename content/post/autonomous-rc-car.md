+++
date = "2019-02-26T12:00:00-00:00"
title = "Building an autonomous RC car"

+++

This is a hands-on article that encourages you to experiment and see what works on the ground.

*Shameless Promotion*: If you are in Montréal, I ([@heri](https://twitter.com/heri)) do a meetup where people interested in computer vision, AI, robotics work on [autonomous cars](https://www.meetup.com/DIY-Robocars-Montreal-Meetup-Autonomous-cars-race). Please drop by!

## Why a RC car?

Like developing an application, my recommendation is to build first a *Minimum Viable Product* (MVP). Then iterate it quickly from there towards a version that works for you.

An autonomous car is at the bare minimum able to follow a course, without any input from a human driver. That is an engineering challenge, both on the hardware and software side. The car manufacturer needs to install a wide array of sophisticated sensors, ranging from cameras, [LIDAR](https://en.wikipedia.org/wiki/Lidar), GPS to engine sensors. It also requires actuators so a computer can drive the engine, gears and steering. The software has to ingest a huge flow of data, decide on the best route based on missing or conflicting data, and make sure not to harm anything in the way.

These constraints means making a autonomous car is costly and prohibitive for most. If you want to build a life-sized self-driving car, you need to join a team at Waymo, Baidu, Yandex or another billion dollar company like Tesla.

A *hack* is to work on an RC car, instead of a life-size car.

RC cars are plenty available. The smartphone and drones boom means there are plenty of cheap and diverse sensors and parts usable for your project.

RC cars are also light, which means an accident will not create body injury. If a part breaks, you can replace it easily and quickly.

Finally, RC cars can have simpler autonomous software. You don't need a mission planner. Object tracking is not necessary. The MVP can just have track recognition. This is good news for those who want to study computer vision or neural networks, without being a specialist in hardware, mapping, motion planning or in Linux.

All this means development costs and times are cut down. Instead of months and years, you could have your first autonomous in a few weeks time!

## Anatomy of an autonomous RC car

An autonomous RC car mirrors a life-size car, with simpler parts:

* A main motor with a transmission,
* A battery,
* At least one ESC or [Electronic Speed Controller](https://en.wikipedia.org/wiki/Electronic_speed_control). The ESC will run the motor,
* A [servo](https://www.servocity.com/what-is-a-servo), for steering.
* Sensor. At the bare minimum, you will need one wide-angle camera.
* A computer or equivalent to record, run inference based on data from sensor and send outputs to the servo and ESC. A Raspberry Pi is good for the first version.

It does not need: 

* A RC transmitter/Receiver. Instead, you will use the [GPIO pins](https://en.wikipedia.org/wiki/General-purpose_input/output) of a Raspberry pi to send signals to the ESC.
* A RC body. Electronics should be easily accessible and replaceable. 
* A gearbox
* Turn signals (blinkers), brakes or headlights
* a GPU card or TPUs, at least not in the beginning.

On the software side, a RC car has a main python program that decides what to do next based on image recorded. Here, you can use either machine learning (Deep Learning/CNN/Tensorflow/[Keras](https://keras.io/)) or traditional computer vision. 

For computer vision, the best way to start is with [OpenMV.io](http://openmv.io). The camera has a board that will do the calculations such as [line detection](https://openmv.io/collections/cams/products/openmv-cam-m7), contrast/exposure changes. In the case of an autonomous car using CV such as Teslas, it will use a basic technique called "blob tracking" that shows a center point, which tells the car how to steer to stay on the line. See the code and a [DIY Robocar post here](https://diyrobocars.com/2018/11/23/updated-minimal-viable-racer-to-use-latest-openmv-linear-regression-code/. It's less sophisticated and less *trendy* than machine learning, but produces good results as well.

For machine learning, the application will have at its core a convolutional neural network taught with supervised learning. This means the neural network is trained on an external computer using image frames from the RC camera and then run the inference model on the edge computer to generate the corresponding outputs to the servo and the motor.

This is very similar to computational photography on Huawei or Google phones. Engineers took a variety of images from the camera, annotated parts of the image that should be blurry (aka [bokeh](https://en.wikipedia.org/wiki/Bokeh) ). Each user can then produce portraits with bokeh on their phone, based on the model trained in the previous step. But instead of motor signals, it produces bokeh.

Fortunately, there is fortunately the amazing [Donkeycar](http://docs.donkeycar.com) project that has ready-to-use software and hardware instructions. There are links to find the appropriate parts, and if you are stuck, there is also an active community on Slack. There are also good projects like [RyanZotti](https://github.com/RyanZotti/Self-Driving-Car) which works well for smaller RC cars and Lego, the Udacity stack or Apollo. However, Donkeycar is the most usable and beginner-friendly in my opinion. You don't need soldiering and you don't need a lot of extra electronics to start.

When you combine the hardware and software and want to launch your first RC autonomous car, the process is the following:

* put together a track
* connect through SSH to the Raspberry Pi, and then access driving controls on the web, or with a controller.
* try to drive a few laps, like what a real good driver would do
* once you are sure of your driving skills, begin recording laps. All image frames and inputs (throttle, steering angle) will be recorded
* transfer training data to the main computer
* training is done typically on a beefy computer with a recent Nvidia card, or otherwise on a cloud server with a GPU (Google Compute or Amazon). The loss value represents the difference between what the neural network computes and what would be an ideal output. You will want to minimize this, without overfitting the model. Once you're happy with a loss value, you can validate it 
* use the trained model with your RC car, and race it!

For those who haven't done neural networks, this is a great way to understand how it works, and perhaps have your first AI application.

## What's next?

Now, that is the Minimum Viable Product. Other developments could be:

* Use instead an Nvidia Jetson board. This is much more powerful, and better suited for machine learning. Models can be trained and run directly on the board, without requiring an external computer with GPU. You can add easily multiple cameras, speed sensors, LIDAR, GPS without any issues, and run at the same time a mission planner. However it consumes significantly more power compared to a Raspberry Pi, costs at least x5 more, and takes so much space that you will have to upgrade to a 1/10 RC car.
* Find a good driver of RC cars, or become a very good driver. Because after all, A.I. only learns from your inputs. This is what most people forget. Everyone wants to buy more expensive cameras, or just write more code. Often, models are fed garbage. It can be only as good as you are. This is why big corporations like Waymo require driver trainers with a *spotless* driving history
* Improve electronic parts so the RC car becomes more precise and more responsive. Often, RC cars have too much torque, imprecise steering, and also have a delay compared to life-size cars,
* Try [differential steering](https://en.wikipedia.org/wiki/Differential_steering). It can be a RC tracked vehicle, or a [Mars Rover](https://en.wikipedia.org/wiki/Mars_rover)-style robot
* Improve the machine learning model. You can track [arXiv CV](https://twitter.com/arxiv_cscv), and check out recent self-driving or computer vision papers. You can then try to implement the algorithm presented, if there is minimal code. You can work on reinforcement learning, data augmentation, use different kernel size, lens correction, sensor fusion etc.
* Add actuators. For example, add a loader, or snowplow system. For example, this guy developed [a package delivery system](https://www.hackster.io/abdullahsadiq/autonomous-delivery-system-4c2048) based on the donkeycar! Isn't that amazing? Now you can have your $100m VC funded startup with open source electronics :)
* Add sensors for better depths perception, for example to prevent collisions. There are [LIDARs for $99](https://www.dfrobot.com/product-1125.html). Or add an IMU (angle/orientation sensor), add a GPS, beacon system etc.
* Add obstacles, small pedestrians models, traffic lights, etc. 
* Use the knowledge and extend it to autonomous boats, rockets, planes. There are competitions for [autonomous flight drones](https://www.herox.com/alphapilot),
* Integrate more complex autonomous software such as Autoware or [Apollo](https://github.com/ApolloAuto/apollo) and make it run a complex command. Such as go pickup package at point A, go to point B, wait for a signal, then park. 
* There are [autonomous car kits](https://roboticsmasters.co/fullsizecars/) for real cars. Another kit [running openpilot](https://github.com/commaai/openpilot) is provided by comma.ai for recent Toyota/Honda cars.

I strongly suggest taking a lean approach. Do step by step improvements, save every model you've validated. It's better to have regular small improvements than try to go big and then fail big.

If you are around, we'd love to have you at [our next meetup this wednesday Feb 27](https://www.meetup.com/DIY-Robocars-Montreal-Meetup-Autonomous-cars-race/events/259007280/) or [check other meetups near you](https://diyrobocars.com/local-meetup-groups/)

Thanks to @joshnuss @166inter @MassimoFarina for their valuable feedback!