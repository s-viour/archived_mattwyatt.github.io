---
layout: post
title: development of this site
subtitle: crystalization of an aesthetic
---
Right, this diary thing. First article. This article likely won't be all that great, nor coherent. I expect to get better at this, however. Anyway, here we go. For a very long time now, I've been wanting to turn my vague idea of an aesthetic into a real and visible thing. When I began work on this site, I wanted it to look *exactly* like what I had imagined. An understandable goal. However, when I began to write the stylesheets for the site, I noticed that I really didn't have a clear idea of just what this design was; it was only a vague concept in my head. This was the first challenge.

## the aesthetic
When I began to write the site, I knew that I wanted black lines, or something similar, in the background. I wanted to achieve, not a sketched look, but a sketched *feel*. To achieve this, I use a javascript library called [rough.js.](https://roughjs.com/) Rough is wonderful, really; it's the most important part of the atmosphere of the site. After writing the script to draw random lines all over the place, I found the site still lacking. I wanted stars. I draw stars all over the place, when it comes to paper; there is no reason that they shouldn't be all over my website.

## drawing stars
Unlike the line-drawing function. The star-drawing function was going to be much more difficult to work out. Lines have two points, so I could generate two random numbers on opposite ends of the page, and draw. Stars don't just have two points though, they have *five*. Writing something that generated five different points in proximity enough to make a star was out of the question. I settled for SVGs. The star drawing script actually uses pre-defined SVG paths for the stars; the SVGs were drawn with [Inkscape](https://inkscape.org/en/) and then copied. I wrote a script that took the SVG paths, and used Rough to draw them; however, it drew all of them in the same place. Rough had no way to translate SVG paths by default, and so it drew them all at `(0,0)`. A bit of research showed that SVG DOM elements had a "translate" attribute. Bingo. After modifying the script to generate random numbers for the "translate" parameters, I was drawing cute little stars all over my site.

## the content
I spent a great deal of time making the background-generation for this site perfect. During that time, however, I happened to forget that I needed to display page content. While developing the background, my previously-vague idea of an aesthetic had begun to solidify into a set of rules. (two to be exact)

* Everything must be black and white
* Everything must vaguely remind the viewer of a handwritten letter

A peculiar set of rules, for sure, but a set of rules nonetheless. To meet my first requirement, I selected two colors: `#000000` and `#fdfdfd`. To meet my second requirement, I settled on a CSS class that would have a header, a subheader, and a body, just like a letter. After applying a drop shadow on all sides, the site looked perfect.