# README

## Getting up and running
* bundle
* yarn install

Terminal 1:
* rails s
Terminal 2:
* webpack-dev-server

## Runnning Tests
Terminal 3:
* npm test

This will run all tests in `**.spec.js` files contained within the `components` file using Headless Chrome.
The tests run using a mix of Karma, Mocha and Chai and will re-run within the terminal on saved changes. Console logs are printed into the terminal.

Managing the promises with nextTick etc is not very tidy... TODO: look into another testing framework that does this better than mocha?