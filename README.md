HN-IonFire
==========

Realtime Hacker News hybrid app. Made with [Ionic](http://www.ionicframework.com) and [AngularFire](https://www.firebase.com/docs/web/libraries/angular/index.html).

The app itself is like a tutorial application for now. You can see the mobile web version [here](http://xelom.github.io).

I made this app in a very little time. There may be issues :)
I didn't try Android and IOS versions yet. Using websockets in mobile applications might not be a good idea but expecting to work with IOS 6+ and Android 4.4+.

Credits First
=============

Driftyco! The people behind beautiful Ionic framework, big thanks to you guys. You are awesome. While I'm in the middle of this app I saw their [front-page](https://github.com/driftyco/front-page) app which is a Hacker News app but without the new [HackerNewsApi](https://github.com/HackerNews/API).

I heard they were using it for testing purposes back then and now they open sourced it. I took some styles and ideas from that application so go check it out it rocks!

Firebase team! Love your platform. Taking it to the next steps via libraries like AngularFire is a big plus. Thank you & keep up your good work.

Summary
=======

I wanted to play with Ionic, Firebase, Angular.js, Github(For Windows), Atom.io for a long time. This little app was for that purpose :)

Overall I loved Ionic. It is really easy to progress and progress is the motivation. So creating the app was fun and full motivational. Also angular.js helps a lot!

Using angularFire was nice also. Achieving basics is quick but if you want to do just a little bit complex stuff. You have to dig in to the documentation and fail a couple times. But that was reasonable :) 

Installation
============

You can fork the repo to play with the code or emulate on Android & IOS. 

Just fork it then;

`$npm install -g ionic cordova gulp`
`$cd forkLocation`
`$ionic serve` from the terminal and Voila! ionic CLI starts a web server with live reload. It's pretty badass.

Known Issues
============

- Number of comments in the feed page shows only direct comments not all comments. I didn't want to make recursive calls to retrieve total comment count in a mobile app.
- Comment button is not looking like a button in the feed page.
- Comment's text in the comments page is messy. Needs to be styled better.
- When you click to the "x more comment" button in the comments page, loading button shows before that button hides.

MIT LICENSE
===========
