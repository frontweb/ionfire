# IonFire

Ionic template app that can configure itself on-the-fly by downloading its content & structure from the Firebase database.

[![IonFire Preview](https://s3-eu-west-1.amazonaws.com/fweb-public/ionfire-video-preview.png)](https://youtu.be/hbPHGyG8GZY)

## Installation

```bash
$ npm install -g ionic cordova
$ npm install
$ ionic serve
```

### Add cordova platforms

```bash
$ ionic cordova platform add ios
$ ionic cordova platform add android
```

### Firebase

- add app and copy config to app.config.ts
- update security rules to allow un-authenticated reads:
```
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

### Update icon

- replace icon.png and splash.png in mobile/resources and run `ionic cordova resources`

## How to run

- with logs and chrome://inspect: `ionic run android -c`
- with logs and live reload: `ionic run android -l -c`

## Upload to Ionic View

```bash
ionic link # only once
ionic upload
```
