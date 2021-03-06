Event-Check-in (Aimed to serve Austin on Rails)
==================

Take attendance at your events. Users may only check-in if they are
within 100 meters of the geolocation on set address.

Uses HTML5 geolocater to verify user is in within the radius set for the event.

Show page will automatically update as users sign in using **Faye/private_pub**.

Uses **DEVISE/OMNITAUTH** for Twitter log-in.


## Styling

[Foundation](https://github.com/zurb/foundation-rails) is responsible for mobile design. [Masonry](http://masonry.desandro.com/) is used for the animation.
10.8.13 MVP Design, still needs to design everything out.

## Rails Setup

Rails app uses **postgres** so be sure it's running.

1. Rake db:create db:migrate
2. Rails Server
3. [localhost](http://localhost:3000)

## Websocket Setup

**Faye/private_pub** follow these instructions here [Josh Crew](http://joshcrews.com/blog/2013/06/07/running-private-pub-slash-faye-server-on-heroku/)



