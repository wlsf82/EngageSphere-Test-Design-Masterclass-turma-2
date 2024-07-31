# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.13.1` while writing this doc)
- npm (I've used version `10.5.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, open a terminal, go to the root of this repo, and run `npm install` (or `npm i`, for short.)

## Tests

The tests scenarios are documented [here](./docs/TestCases.md), you can check the scenarios whenever you need.

To run the automated tests in headless mode, you can run the below command in the terminal to execute GUI and API tests:
```
npm run cy:run
```

To run the automated tests in headless mode, you can run the below command in the terminal to execute component tests:
```
npm run component:run
```

To run automated tests in headed mode in a browser, you can run the command below in the terminal, select E2E testing for API and GUI tests, or Component for component tests:
```
npm run cy:open
```

When finished, all tests must have been carried out without fail.
___

Made with ❤️ by [Walmyr](https://walmyr.dev).