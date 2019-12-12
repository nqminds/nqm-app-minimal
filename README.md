# nqm-app-minimal (webpack version)

Minimal application for use with the updated application account system.

## install and run
### development
```
cd nqm-app-minimal
npm i
npm start
```
### production
```
cd nqm-app-minimal
npm i
npm run start:production
```

## commissioning
Create an **application definition** using the **nqminds toolbox**. Note the application id and secret and insert them into the
`./server/settings.js` file.

Ensure the settings in this file match the TDX you are using

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

To pass data to the client from the server on boot see the /nqm-setup-data route in routes/index.js (for example passing a server dataset id).

## client

Client files are included in `app` directory. The application is built with [React](https://reactjs.org/) and bundled with [Webpack](https://webpack.js.org/). It is already configured
in `internals/webpack` - there are two separate configurations - for development and production.

Libraries:
- [Redux](https://redux.js.org/) - store configuration is defined in `app/redux/configureStore.js`
- [React-router](https://github.com/ReactTraining/react-router) - library for handling routing, main routes are defined in `app/containers/App/index.js`
- [history](https://github.com/ReactTraining/history) - library for managing session history
- [Connected-react-router](https://github.com/supasate/connected-react-router) - Redux binding for React Router v4 
- [material-ui](https://material-ui.com/) - UI components library. It can be customised by changing `app/themes/index.js` file

### module structure

The majority of code for the client is organised into modules, these provide a level of seperation between different functions within your application. No module should ever depend on any other module other than core - i.e. Do not make a module depend on redux state or components in other modules.

If a module will require its own state and actions it should include the actions and configs folders, see the core module for an example. Additionally the module must be loaded in main.js.

### client side routes

To add a route to the application see the application-component.js file in the core module, the authenticated route component available in the core module will enforce user login for a route.

### containers

A container connects a component to the context and state of the application, additionally it is generally good practice to load data in containers.




## building

Once your app is ready for production, you can bundle the client-side packages into a single, minified file, and then package it as a databot. This will output to a file databot.zip.

When creating the databot definition you should copy the contents of /server/settings.js to the packageParams or input of your databot as the settings field. Additionally uncomment the line named production

```
npm run databotify
```

## deploying

In order to simplify deployment of your application you can use the command

```
npm run deploy
```

This will create a databot inside the application's server folder, build your code, upload that code to the databot file and then start the databot. If you have run this command before it will handle that too. 

You *must* ensure that you have shared the created databot definition and zip resource with a host for this to work. The script will warn you if it thinks you haven't.
