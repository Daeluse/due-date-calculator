# Due Date Calculator

## Getting Started

```console
foo@bar:~$ npm install
foo@bar:~$ npm start
```

## Overview

The service exposes a listener for a single GET request with two query parameters.

http://localhost:3000/due-date?duration=1&submission=1737484586784

The `duration` query parameter is the number of hours that it will take to achieve resolution. The `submission` query parameter is the timestamp for when the resolution timer begins. If the `submission` time falls outside of working hours, it will be post-dated for the earliest available time.

## Automated Test Suite

```console
foo@bar:~$ npm install
foo@bar:~$ npm run test
```