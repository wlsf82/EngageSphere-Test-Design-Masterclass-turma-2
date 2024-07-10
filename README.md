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

# Cypress Test Execution Guide

This guide provides instructions on how to install and run Cypress tests for your project.

## Pre-requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) - Cypress requires Node.js to run. It's recommended to use the version specified in your project's `package.json` file.
- npm (comes with Node.js) - Used to install Cypress and manage its versions.

## Installation

1. **Clone the Project**: First, clone the repository to your local machine using `git clone <repository-url>`.

2. **Navigate to the Project Directory**: Change into the project directory with `cd <project-name>`.

3. **Install Dependencies**: Install the project dependencies by running `npm install`. This command also installs Cypress if it's listed as a dependency in your `package.json` file.

   If Cypress is not installed automatically, you can install it manually by running:`npm install cypress --save-dev`

4. **Running Tests**: Cypress tests can be run in two modes: Headless and Interactive.

   Headless Mode
   To run tests in headless mode (ideal for CI/CD environments), use the following command: `npx cypress run`

   Interactive Mode
   For development and debugging, it's often useful to run tests in interactive mode. Use this command: `npx cypress open`
   This opens the Cypress Test Runner, where you can run individual test files and see the results in real-time.

---

Made with ❤️ by [Walmyr](https://walmyr.dev).
