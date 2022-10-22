# RandomWalk
A simple simulator for the Random Walk pattern of motion, observed in Brownian motion.

This simulator uses HTML 5 and Javascript to work, and an SVG node on the page to render its output. I have yet to work on the UI/UX of this, but first I wanted to get the basics set up and working.

The entire project is a single client-side HTML application, which will display the animation of the Random Walk by generating the animation in real time inside the browser.

You can see this code in action [here](https://theocrat.github.io/RandomWalk). Note that it runs inside your browser, using your machine's resources. It runs well on a PC or laptop, but does have bugs on phones.

### Approximations made

  * All collisions are elastic
  * All the "balls" have the same mass
