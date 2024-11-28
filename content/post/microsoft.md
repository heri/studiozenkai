+++
date = "2018-12-05T12:00:00-00:00"
title = "Looking again at Microsoft"

+++

The natural cycle of companies is to innovate. The flame dies down, then it fights again to innovate.

Microsoft is one of those. Win 3.1 was revolutionary, and so was Win 95. With Win 3.1, you could point and click to start programs. With Windows 95, you could install games with a nice GUI instead of typing arduous commands in MS-DOS. No more failures at the video setup or having to find a driver file for your sound card.

Somewhere along the way, Microsoft went greedy. Instead of optimizing for good products, the mega corporation optimized for dollars. It sued any organization threatening its dominant position. Innovation was adding recycled buttons and rows in Microsoft Office. This was good for shareholders but made everyone’s life worse.

At that time I switched to an Apple iBook. The white plastic made it look like a toy, but it “just worked”.

I tried [Visual Studio Code](https://code.visualstudio.com) recently. To my surprise, it is a very well built piece of software. I remember Microsoft Visual Studio in engineering school. You needed to be “corporate” to go past the licensing pages, then feel out of place if you didn’t read 500 pages of C#. My initial computer science dreams died there.

I am happy to report VS Code is lightweight and lets you work right away. I have been using it for more than 18 months and have yet to find an issue. It just works. Previous Microsoft products could do everything and nothing. VS Code took courageous design choices so it performs well in the few things it's designed to do.

Typically, I have 3 to 5 workspaces open at the same time. A workspace has at least two folders, each folder representing an application. That is tens of thousands of javascript, ruby, python, shell, css/html files. I can search and replace a pattern in a 440MB log file, and it will not crash.

Atom.io is a similar code editor from  Github. It also uses Electron. But where VS Code shines, Atom.io chokes up on large javascript files (>1Mb). I am not sure if Atom.io tries to execute the javascript or if it has a weak rendering engine. It is “OK” for editing text files or quick coding, but unproductive for a large project.

Sublime Text is a nice native code editor. But I prefer VS Code's built-in Github integration, workspaces, and extensions. TextMate, another code editor I used for years, also “just works”, but is dated. Now, I only use VS Code and vim for programming, on a Macbook Pro or a Windows or Linux laptop. It even works on Raspbian!

VS Code is not an exception. I like the Microsoft Surface hardware line-up. The Surface Book could be a nice Macbook Pro replacement, if Windows had a good Terminal. I haven’t had the chance to try Azure, but I’ve been told it holds up compared to AWS or DigitalOcean, my preferred hosting provider.

Somewhere along the way, somebody at Microsoft got people working together and started caring about making their users’ life easier. In other words, they started optimizing for good products, instead of optimizing for dollars.

Here are a few good things I would love to see to commit fully to Microsoft:

- Rendering fonts and subpixels is sketchy compared to Apple, no matter the screen resolution. Is it possible to get one of your hardware designer to work on this?
- I would love if Microsoft (or Apple) made fingerprint profiles. If I use my fingerprint, allow access to all apps and data. If it’s a kid’s fingerprint, disable the App Store, and allow Youtube for a limited time. If it’s not a recognized fingerprint, show a clean desktop, with the rest of the data encrypted. I see computing devices as tools. I can share a tool or a car with a family member, why can’t you do the same with computing devices?
- A Linux Terminal. I would like to use shell scripts, docker in Windows, use ssh and any other tool I use in a Linux/Ubuntu machine. Please?
- Forget about telemetry and offer complete privacy by default. We do not want devices that phones home or with back doors. If you treat us as pirates or irresponsible kids, we will become pirates and irresponsible kids. Please trust your users and we will trust you too.
- I know you are working on a new browser. For the love of common sense, find a way to solve the GDPR, cookie popups, adtech and privacy abuses. Why can’t we have a browser setting “I accept/I do not accept cookies for all sites”? So it gets rids of all annoying popups. Why don’t we have the browser handle privacy? Browsers should be able to give websites a key to private data information, after a fingerprint confirmation. Once you are finished with a site, you could ask the browser to terminate access to the data.
- Don’t annoy me with updates and questions. MacOS started asking constantly if it can update software and reboot. This interrupts my workflow and makes me think it is broken. If there is a critical update, and the core software needs to be updated, just do it, without interruption. If it is not a critical update, please give us an option “I will update my software manually” so we do not have to agree to a software update every week.