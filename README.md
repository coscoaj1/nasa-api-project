
# This is a Nasa Astronomy Picture of the Day Image Gallery
* Live demo [_here_](https://nasa-api-project.vercel.app/)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)


## Info

This is my project submission for my Shopify Frontend Engineer Internship Summer of 2022 application. Ran into a few gotchas of course, maily in that the APOD is sometimes a video link :) However, not such a big deal. I did make it work by conditionally rendering an iframe if the media type was video. Also, formatting dates on the fly for every
request is a bit tricky!

## Technologies

Project is created with:

* React/Next.js
* TailwindCSS
* NASA's APOD(Astronomy Picture of the Day) API
* Tested with Jest/React Testing Library and Cypress
* Deployed on Vercel

## Features

* Carousel style image gallery that displays the image or video of the day along with the date and description.
* Forward/back buttons to load the images/videos of previous days.
* Mobile Responsive.
* Option to toggle between dark and light mode.
* Like/unlike button.
* Spinning NASA logo for the loading state.

## Room for improvement
* Add a date picker to choose the start date
* Add a button to share/tweet the photo.



