+++
date = "2016-05-04T15:35:26-04:00"
title = "Why my next laptop won't be an Apple"

+++

## Part I - Apple's Craftmanship

I have used the original macbook, the 13" MacBook Air, the 13" Macbook pro, and 15" Macbook pros.

I loved the white plastic of the original macbook. It was better than any other computer I've used before, worked out of the box, and iMovie amazed me. Drag, drop, and five minutes later, you have a video.

![macbook white](/images/macbook_white.jpg "[macbook white]")

I thought this is what computing should be.

When the hard drive died, I got a Macbook Air. It was professional looking, impossibly thin and had a polished OS.

I was an Apple fan.

I doubled down. XCode, Final Cut Pro, Apple Aperture. A much more powerful 15" Macbook pro.

Those were the _golden age_. Apple was the best choice in web development and creative work:

* OS X was the most advanced, most powerful and most reliable OS. Windows had viruses, the worst user experience with nagging dialog boxes, and always shipped with crapware. Linux was reliable, but lacked hardware compatibility and good software.

* OS X is a master class in UI and UX. Menus, notifications (if any), hardware integration. It seemed every detail was polished over and over.

* Hardware was overpriced but well thought-out. It could handle dozens of Photoshop documents, xCode projects and Safari tabs, and will not crash.

* Hardware was deeply integrated and transparent. When everyone else taunted numbers, Apple laptops just worked.

All manufacturers would add software or hardware buttons and then announce an extra feature. Apple was going the other way, exploring to cut the extras. Everything was bold and clear.

Study what they have done if you want to release a technology product.

## Part II - Apple Marketing

It is not easy to put an exact date. It might be around Steve Jobs' parting.

Priorities changed. No disruptive computing devices, just iterations.

Nagging dialog boxes appeared, without any options to deactivate.

Hardware and software for pros, like Final Cut Pro were dumbed down.

Mac Os X Server phased out, closing the window to OS X super computers.

Hardware that could be for grandmas introduced as "pro", such as the iPad Pro.

Various consumer devices such as the Apple Watch took more space on the home page. At the same time, "serious" computing such as the Mac Pro took  an eternity to be updated.

Now, there is an emphasis on pink and yellow gold devices, with no influence on the performance.

This is where you think that _Apple might just be a better marketing company than technology_.

## Part III - The Schism

The question is : Are Apple computers good enough for professionals?

It's now 2016 and I spend time [researching machine learning](http://studiozenkai.com/post/bots/). Computation power is critical.

Most data scientists and machine learners use powerful servers or desktops for computation needs.

You have ample space to add affordable parts or expensive NVIDIA Tesla cards.

In the startup world, laptops are kings though. There are frequent meetings in coworking spaces, coffee shops and demos in meetups. This makes laptops a requirement.

What are the laptop options for Machine Learners?

Let's break the needs.

### Memory

I work with memory-mapped databases and the more memory the better. 16GB is the bare minimum, 32GB is comfortable, 64GB is better [1]

This already disqualifies most laptops on the market.

### CPU

CPU is irrelevant. Of course, the faster the better. But if there is more budget, it's better to put it in hard drives or RAM.

### Hard drive

Solid state drives with good throughput and high IOPS are a must.

With a good hard drive, you can do many experiments every day and iterate quickly to a good model. With a slow hard drive, your only option could be model design during the day. Then you have to let the training run for a whole night.

### GPU

A good GPU is the workhorse. Most of modern non-trivial machine learning or statistics libraries are done by a GPU.

I bet on NVIDIA with the latest CUDA drivers.

If someone intends to implement their own library from scratch or if they have a project that doesn't use CUDA, then Radeon & OpenCL can be a viable alternative.

It is also important to check the RAM available on different models. A good NVIDIA card which can load in its 8GB DDR5 RAM all the data will chew through your data. Another NVIDIA card with a good GPU but with only 1GB RAM will have to swap through slow memory leaving you frustrated.

### OS

Most machine learning and stats libraries are generally poorly supported on Windows, if not at all.

A few such as the Torch improvements developed by Facebook work on Linux.

Others (popular libraries on Github) work better on OSX.


## Part IV - My Next Laptop

Based on the requirements above, here are options:

* _Low Budget:_ I can go with a thin client (a 12" macbook, a linux laptop) to SSH into Linux GPU AWS instances. OK in most situations but lacks versatility and could be more expensive than owning an expensive graphics card in the long term.

* _Mac:_ Macbook pros can have 16GB RAM and best-of-breed hardware. However, they can only have an AMD Radeon graphics card which is a big No. Even the powerful Mac Pro only has AMD cards. Why Apple? If you absolutely need an OSX platform, you could get a second hand macbook pro with a Nvidia GT 750M, like I did six months ago. It is still far from an ideal situation.

* _PC:_ With [Microsoft's recent announcements of Linux support in bash](https://blogs.windows.com/buildingapps/2016/03/30/run-bash-on-ubuntu-on-windows/), I consider PC laptops are now a viable choice. For the best performance for the money, there are gaming laptops built by [Clevo, Sager, AORUS](http://studiozenkai.com/post/cuda/). Razer also sells the [Blade Stealth](http://www.razerzone.com/gaming-systems/razer-blade-stealth),  a thin client that can work with an external GPU. Imagine having a Titan or a Tesla in the external box. Dell and Asus also have [a similar external box to house NVIDIA cards](http://www.dell.com/content/products/productdetails.aspx/alienware-graphics-amplifier?c=us&cs=19&l=en&s=dhs&sku=452-BBRG). These external boxes are interesting however they are very few reviews. I would therefore looking into *Lenovo Laptops* such as [the T460p](http://shop.lenovo.com/ca/en/laptops/thinkpad/t-series/) which have a dedicated nvidia GPU. These laptops are known for their reliability, guarantee and excellent Linux support.

I realize that **there are no options from Apple for developers working in machine learning**.  This is not just a problem for machine learning but also for photographers and videographers who need graphics acceleration in Adobe Premiere or in BlackMagic resolve. NVIDIA cards are a requirement for Adobe's Mercury Engine and can save hours in editing and post-production. This is why my next laptop won't certainly be an Apple laptop but one running Windows 10.

### Notes

[1] [Depending on your motherboard](https://www.linkedin.com/grp/post/3078126-274143486), you can be limited to 16GB of RAM. Make sure to check before expanding to 32 or 64GB
