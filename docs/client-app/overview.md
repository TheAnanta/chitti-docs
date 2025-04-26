# Client Application

## Overview

The client application _(labelled `CHITTI.` on market stores)_ is the entry point for customers who are currently enrolled (or) wish to be enrolled customers of CHITTI. to access the resources purchased (or) to be purchased.

The application allows users to sign in with their organizational learning management system credentials as a measure of secure authentication to provide a personally tailored experience. The users are then offered to purchase content for the subjects they wish to pursue, of which they are enrolled in the current semester in the organization. On successful purchase, the content is available to the users, which is revoked upon completion of the exam **automatically**.

**NOTE**: The client application provides a free-tier for the users, i.e, the **first unit** of every subject is provided as a **freemium** offerring.

The client application is available to the public for the following platforms:

- [Android](https://github.com/TheAnanta/chitti-app/releases/download/1.0.1/score-with-chitti-app.apk)
- iOS (Coming soon)
- [Windows](https://github.com/TheAnanta/chitti-app/releases/download/1.0.1/chitti.exe)
- [macOS](https://github.com/TheAnanta/chitti-app/releases/download/1.0.1/chitti-macos.zip)

## Features

1. View academic data
2. View courses enrolled
3. Purchase content for enrolled courses
4. View course content\
   i. **Roadmap**: Roadmaps are marks-based weighted topics from each unit of the particular subject that help students prepare their exam preparation journey.\
   ii. **Videos**: Easy-to-understand short informal video lectures taught by academically-well performing students in a layman format.\
   iii. **Notes**: Handwritten notes from academically-well performing students help students prepare for the exam with detailed information as dictated by the faculty.\
   iv. **Important Questions**: Important questions to revise the exam preparation based on deep analysis through previous year question papers and faculty-recommendations.\
   v. **Cheatsheets**: Last minute revision of important formulae and diagrams to ace the bonus marks through well-presentation and calculation-based answers.
5. Recieve reminders and motivation for exam preparation.
6. Support single-device sign-in.
7. Prevents screenshots, screen recording nor casting/screen-share of internal content.

## Technology Stack

1. Flutter [<sup>1</sup>](#references-1)
2. Firebase [<sup>2</sup>](#references-2)

## Architecture

Assuming the usage of the client application to be high and predicting the behaviour of application users, we identify a heavy requirement for well-architected modelling to handle the high surge in data and request to the server. Thus the application makes well use of the clean architectural principles and components which will be discussed in the next page.

## References

<span id="references-1">1. The "Flutter" name and logo are trademarks owned by Google.</span><br/><br/>

<span id="references-2">2. The "Firebase" name and logo are trademarks owned by Google.</span><br/><br/>
