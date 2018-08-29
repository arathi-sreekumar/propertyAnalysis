# Initial Set up

## Required:

-   node version 6 or higher

If you use npm, you can install yarn globally by using `npm install yarn -g`

### Yarn global installs:

```yarn global add jest
yarn global add nodemon
yarn global add webpack
yarn global add prettier
yarn global add eslint
```

To get flow working:
`yarn global add flow-typed`

To run flow use `yarn run flow`

## Building the project

-   On your project directory run `yarn` to install all dependencies.
-   Run `yarn build` for production ready build or `yarn build:dev` for development ready code.
-   On a separate terminal run `yarn watch` for linting and building your code on the fly while you make changes.
-   Run `yarn dev` to fire up a dev server from your project directory.
-   Access your project at `http://localhost:8080/`

Api's used:

-   [Zoopla Api](https://developer.zoopla.co.uk/)
-   [Google maps api](https://developers.google.com/maps/documentation/)

Note: google maps api is accessed using [react-google-maps](https://tomchentw.github.io/react-google-maps/).

Charting Library: [react-easy-chart](https://rma-consulting.github.io/react-easy-chart/)

CSS: [Bulma](https://bulma.io/) an open source CSS framework based on Flexbox.

-
