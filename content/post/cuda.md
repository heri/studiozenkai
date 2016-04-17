+++
date = "2015-10-11T10:35:26-04:00"
title = "Cuda Cores Ranking for Machine learning"

+++

NVIDIA graphic cards can be used to accelerate [scientific computing](https://developer.nvidia.com/gpu-accelerated-libraries), [neural networks](https://developer.nvidia.com/cudnn), video games and occasionally bitcoin computing.

Video editing and post-production also benefit greatly from NVIDIA cards with Adobe's Mercury Engine or BMD's Davinci resolve.

In the case of scientific computing, performance is directly proportional to the number of cuda cores. As long as cpu speed is > 2GHz and you have as much RAM as you have GPU RAM, you are all good.

As such, this lists current top 10 laptops that have a good price vs cuda cores # ratio.

## Caveats

If you are looking for top performance, building a rig with a few [Nvidia K20X](http://www.amazon.com/NVIDIA-Tesla-Graphic-Card-900-22081-2220-000/dp/B00AA2C1DC/ref=sr_1_2?ie=UTF8&qid=1444533616&sr=8-2&keywords=Nvidia+K20X) or Nvidia [TITAN X cards](http://www.amazon.com/EVGA-GeForce-GAMING-Graphics-12G-P4-2990-KR/dp/B00UVN21RQ/ref=sr_1_1?ie=UTF8&qid=1444534649&sr=8-1&keywords=geforce+titan+x) is more economic with the benefit of having a supercomputer in your hands. It is also possible to just use a cheap gpu-less laptop and upload data to a "cloud" computing service such as mindori or our friends from fuzzy.io

On SLI configuration, most neural networks processes will not use the SLI bridge and will just parallelize calculations as if it had 2 discrete gpu devices:

* Caffe (UC Berkeley) : [parallelization](https://github.com/BVLC/caffe/pull/1148)
* Theano (University of Montréal) : [use of SLI](https://github.com/Theano/Theano/wiki/Using-Multiple-GPUs)
* Torch (NYU). It is difficult to use both gpus at the same time

## 15 inches and more

* MSI Laptop GT80 TITAN, GTX 980M SLI, 3072 cuda cores, [$3,079.99](http://www.amazon.com/MSI-18-4-Inch-GT80-TITAN-SLI-253/dp/B00YQNTLGG/ref=sr_1_8?s=pc&ie=UTF8&qid=1444529401&sr=1-8&keywords=gtx+980m+sli)
* MSI Laptop GT80 GT80, GTX 970M SLI, 2560 cuda cores, [$2,599.99](http://www.amazon.com/dp/B00YPAZT0C/ref=psdc_565108_t2_B00YQNTLGG)
* AORUS X5-CF1, GTX 965M SLI, 2048 cuda cores, [$2,299.00](http://www.amazon.com/X5-CF1-GTX965M-Broadwell-i7-5700HQ-Computer/dp/B0116GST9K/ref=sr_1_3?s=pc&ie=UTF8&qid=1444529775&sr=1-3&keywords=gtx+970m+sli)
* AORUS X7V2 X7V2-CF3, GTX 860M SLI w 4GB RAM, 1280 or 2304 cores, [1,798.99](http://www.amazon.com/AORUS-X7V2-X7V2-CF3-17-3-Inch-Laptop/dp/B00XRI2ABO/ref=sr_1_49?s=pc&ie=UTF8&qid=1444530463&sr=1-49&keywords=GTX+SLI)
* ★ Alienware ALW18-3002sLV, GTX 770M SLI w 3GB RAM, 1920 cuda cores, [$1899](http://www.amazon.com/Alienware-ALW18-3002sLV-i7-4700MQ-Processor-Silver-Anodized/dp/B00FEE7D5W/ref=sr_1_31?s=pc&ie=UTF8&qid=1444530185&sr=1-31&keywords=GTX+SLI)
* Gigabyte P35Xv3, GTX 980M w 8GB RAM, 1536 cuda cores, [$1,694.99](http://www.amazon.com/Gigabyte-P35Xv3-i7-4710HQ-Notebook-Computer/dp/B00TFWN8IU/ref=sr_1_6?s=pc&ie=UTF8&qid=1444529061&sr=1-6&keywords=gtx+980m)
* Lenovo IdeaPad Y510, GTX 750M SLI w 2x2GB RAM, 768 cuda cores, [$1149](http://www.amazon.com/Lenovo-IdeaPad-Performance-Gaming-Laptop/dp/B00ZQUY5SW/ref=sr_1_16?s=pc&ie=UTF8&qid=1444530851&sr=1-16&keywords=SLI&refinements=p_n_condition-type%3A2224371011)
* MSI GP70 Leopard Pro, GTX 950M w 2GB RAM, 640 cuda cores, [$1079](http://www.amazon.com/Custom-GP70-Leopard-Pro-486-16GB-17-3/dp/B00UM6L2EU/ref=sr_1_6?s=pc&ie=UTF8&qid=1444531200&sr=1-6&keywords=nvidia+980m&refinements=p_n_condition-type%3A2224371011%2Cp_36%3A-170000)

## 13 inches laptops

* ★ AORUS X3Plus-CF1, GTX 870M w 6GB RAM, 1344 cuda cores , [$1793](http://www.xoticpc.com/aorus-x3pluscf1-p-7425.html)
* Alienware 13, GTX 960M w 2GB RAM, 640 cuda cores, [$1357](http://www.xoticpc.com/alienware-960m-fhd-backordered-p-8119.html)

## Mac

Apple does not have anymore laptops with nvidia graphic cards. You will need to buy a used macbook pro from 2014 or build a hackintosh, i.e. buy one of the PC laptops above and install mac os x.
