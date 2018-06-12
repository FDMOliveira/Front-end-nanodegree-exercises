## Website Performance Optimization portfolio project
This challenge was about turning a slow and not optimized portfolio in a fast and optimized one.
Here you have the [final](https://cdn.rawgit.com/FDMOliveira/Front-end-nanodegree-exercises/35d5801/Pizzeria/index.html) version page.
You can either check the source file and compare to production file.

### Optimizing steps
Critical Rendering Path:
* Set *media* attribute in a CSS file to remove it from critical resources and avoid it **rendering block**
* Set a Javascript files as **async**
* Use inline Javascript

Javascript File:
* Remove unnecessary code
* Optimize code
* Minification

CSS File:
* Optimize code
* Minification

Reduce the number of downloads:
* Usage of local font

Optimizing image:
* Usage of *srcset* to set different image sources for different resolutions
* Compress images

Grunt Tasks:
* [Imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) to compress images
* [Responsive-images](https://github.com/andismith/grunt-responsive-images) to set different image sources for different resolutions
* [CSSmin](https://github.com/gruntjs/grunt-contrib-cssmin) to minify CSS files
* [Uglify](https://github.com/gruntjs/grunt-contrib-uglify) to minify Javascript Files


Results:
* All above mentioned resulted in a PageSpeed insight score achievment of **91%** in Mobile and **95%** in computer.
* Scroll animation with a consistent frame-rate at **60fps** - pizza.html
* Resize pizza animation in less then **2ms** -pizza.html

### Optimization Tips and Tricks
Here are some sources that were very useful during this challenge: 
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
