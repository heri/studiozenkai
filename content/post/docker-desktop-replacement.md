+++
date = "2021-09-01T18:35:26-04:00"
title = "Docker Desktop command line alternative"

+++

Docker Desktop is one of the de facto tool present on macos developer machines, along with other utilities such as git or homebrew. Contrary to apps such as VS Code, it not an app you interact with everyday but more a background tool running constantly during application development and deployment. It runs in fact the virtual machine that allows you to run docker on Windows or Mac as if you were on Linux, albeit with a little bit more resources.

Many users will need to look for alternatives with the recent announcement that it will now be a paid subscription for medium to large companies. On MacOS, I use docker-machine to run docker from Terminal.

> brew install --cask docker virtualbox

You might need to authorize this in MacOS preferences

> brew install docker-machine

I setup docker-machine with more memory & CPU, since I work on large Ruby and Python/tensorflow projects. Codebases with a small footprint can use the default virtualbox settings.

> docker-machine create -d virtualbox --virtualbox-memory=4096 --virtualbox-cpu-count=2 --virtualbox-disk-size=10000 default

See if it works:

> docker run hello-world

Now you should be able to run docker, docker-compose, build, tag and run images!

Note 1 : Compared to Docker Desktop, you have to manually setup port forwarding once you build and run an image, such as:

> vboxmanage controlvm default natpf1 "nameformapping,tcp,,3000,,3000"

This makes puma available on localhost:3000

Note 2 : If you reboot your machine or if it goes into sleep, docker-machine can stop. Run it again with:

> docker-machine start default

Let me know how it works for you!