# Yumme Web

[![Build Status][github-actions-image]][github-actions-url]
[![MIT license][license-image]][license-url]

[github-actions-image]: https://img.shields.io/github/workflow/status/aesy/yumme-web/Continous%20Integration?style=flat-square
[github-actions-url]: https://github.com/aesy/yumme-web/actions

[license-image]: https://img.shields.io/github/license/aesy/yumme-web?style=flat-square
[license-url]: https://github.com/aesy/yumme-web/blob/master/LICENSE

Web frontend for Yumme - a self-hosted recipe journal.

## Development

#### Prerequisites

* [Node & NPM](https://nodejs.org/)
* [Docker](https://docs.docker.com/get-docker/) 

#### Build

To compile and package the application, simply issue the following command:

    $ npm install
    $ npm run build

This will bundle the application and output it in `build/`.

#### Run

To serve the application using a local development server, the following command can be used:

    $ npm run start

The web server is accessible at `localhost:3000`.

If no backend server url is provided, a fake API client implementation is used. To use a real backend, provide a 
`YUMME_SERVER` environment variable during build:

    $ YUMME_SERVER=<domain>/api/v1/ npm run start

#### Test 

To run lint checks for all scripts and styles:

    $ npm run lint 

Or specify what to lint:

    $ npm run lint:scripts 
    $ npm run lint:styles 

To run unit tests, use:

    $ npm run test

## Deployment

#### Image creation

To create an image, run the following command in the root directory:

    $ docker build . -t yumme-web --build-arg YUMME_SERVER=<domain>/api/v1/

## Contribute
Use the [issue tracker](https://github.com/aesy/yumme-web/issues) to report bugs or make feature 
requests. Pull requests are welcome, but it may be a good idea to create an issue to discuss any 
changes beforehand.

## License
MIT, see [LICENSE](/LICENSE) file.
