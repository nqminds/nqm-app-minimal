# nqm-app-minimal (webpack version)

Minimal application for use with the updated application account system.

## install and run
```
cd nqm-app-minimal
npm install
npm start
```


## commissioning
Create an **application definition** using the **nqminds toolbox**. Note the application id and secret and insert them into the
`./server/minimal-settings.js` file.

Rename `./server/minimal-settings.js` and then update start script in `package.json` to reflect the name change.

## server

Server is based on the [Express.js framework](https://expressjs.com/).

`server/index.js` is the entry point for the application. It reads `--config` parameter and loads passed configuration file.
Then, `server/main.js` continues setup by running: 
- `server/boot.js` - initialises all the required resources on TDX, change it if you need additional datasets etc.
- `server/server.js` - creates express instance and mounts public routes at `/`. They are defined in `server/routes/index.js`.
It is important to note that appropriate **name** and **secret** needs to be set here. 

Finally, http server is started. It runs on a port defined in either:
- application config
- `PORT` environment variable
- default port 8082

To include additional routes in the application (REST api etc.), create new file with routes in `server/routes` directory and mount new routes in `server/server.js` file.

## client

Client files are included in `app` directory. The application is built with [React](https://reactjs.org/) and bundled with [Webpack](https://webpack.js.org/). It is already configured
in `internals/webpack` - there are two separate configurations - for development and production.

`app/app.js` is the entry file, it setups and mounts application in DOM.

`app/bootstrap.js` - its solely purpose is to [switch to new material-ui implementation](https://v3-9-0.material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users).
It can be removed once material-ui releases version 4.

Libraries:
- [Redux](https://redux.js.org/) - store configuration is defined in `app/redux/configureStore.js`
- [Reduxsauce](https://github.com/infinitered/reduxsauce) - helper for creating redux actions and action types
- [Redux-Saga](https://redux-saga.js.org/) - side-effects handler, root saga is defined in `app/sagas/index.js`
- [React-router](https://github.com/ReactTraining/react-router) - library for handling routing, main routes are defined in `app/containers/App/index.js`
- [history](https://github.com/ReactTraining/history) - library for managing session history
- [Connected-react-router](https://github.com/supasate/connected-react-router) - Redux binding for React Router v4 
- [Apisauce](https://github.com/infinitered/apisauce) - library for handling api calls
- [material-ui](https://material-ui.com/) - UI components library. It can be customised by changing `app/themes/index.js` file

 

## production

Once your app is ready for production, you can bundle the client-side packages into a single, minified file. This
greatly improves performance and load times. You can use following commands:

- `npm run build` - build production bundle
- `npm run start:prod`- run production bundle
- `npm run production` - test && build && run production bundle
