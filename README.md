# Booking App

## Description

Booking App is a simple application that allows users to book a link.

## Installation

```bash
$ yarn install
```

## Running the app

## Docker

```bash
# build docker image
$ docker build -t booking-app .

# run docker image
$ docker run -p 3000:3000 booking-app
```

```bash
# setup db
$ yarn run dv:dev:restart

# development

$ yarn run start

# watch mode

$ yarn run start:dev

# production mode

$ yarn run start:prod

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
