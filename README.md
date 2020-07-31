# nqm-app-minimal (webpack version)

Minimal application for use with the application account system.

## Setup

1. Commission an **application definition** using the **nqminds toolbox**, note the application ID and secret.
2. Configure the settings file:
```javascript
default: { // Multiple different configurations are supported
  "applicationId": "applicationId", // From step 1 
  "applicationSecret": "applicationSecret", // From step 1
  "appProtocol": "http", // Generally http for development
  "appPort": 8082, // Only used in development
  "authServerURL": "https://tdx.nqminds.com", // The TDX on which the app definition was created
  "databotName": "minimal", // The name that will be used for creating the app databot, when deployed an app is available at databotName.tdxaddress.com
  "public": { // Various settings available to the client
    "applicationTitle": "app minimal", // The title of your application
    "dateFormat": "HH:mm DD/MM/YYYY",
    "tdxConfig": {
      "commandServer": "https://cmd.nqminds.com",
      "ddpServer": "https://ddp.nqminds.com",
      "queryServer": "https://q.nqminds.com",
      "tdxServer": "https://tdx.nqminds.com",
      "accessTokenTTL": 31622400,
    },
  },
},
```
3. Update the page name in client/index.html and set the favicon if desired
4. **Set the session secret in server/server.js**
5. Remove example code in the client (data-demo, state-demo)


## Installing
The minimal application uses **npm** as a package manager.
```
npm i
```

## Running
The **package.json** for the app comes preconfigured with a few different modes, development mode supports hot reloading when the client code changes but **not when server code changes**.
### Development mode
```
npm start
```
### Production mode
```
npm run start:prod
```
### Custom config
```
npm start -- --config configName
```

## Deploying
The minimal application supports script based deployment to an application databot on the TDX. In order to use this feature a suitable databot host must be available:

- Setup to proxy app requests
- Logged in to npm if private modules are required

To deploy the application:
```
npm run deploy
```
By default this uses the production config, but you can specify a config like so:
```
npm run deploy -- --config configName
```

The command will create the databot definition if it doesn't exist in the app server folder and zip and upload the databot files. **Ensure that both the zip file and app definition are shared with a suitable host**.

## Architecture

### Server

Server is based on the [Express.js framework](https://expressjs.com/).

`server/index.js` is the entry point for the application. It reads `--config` parameter and loads passed configuration file.
Then, `server/main.js` continues setup by running: 
- `server/boot.js` - initialises all the required resources on TDX, change it if you need additional datasets etc.
- `server/server.js` - creates express instance and mounts public routes at `/`, and api routes at `/api`. Routes are defined in `server/routes`.

Finally, an http server is started. It runs on a port defined in either:
- application config
- `PORT` environment variable
- default port 8082

To include additional routes in the application (REST api etc.), create new file with routes in `server/routes` directory and mount new routes in `server/server.js` file.

To pass data to the client from the server on boot see the /nqm-setup-data route in routes/index.js (for example passing a server dataset id).

### Client

Client files are included in `app` directory. The application is built with [React](https://reactjs.org/) and bundled with [Webpack](https://webpack.js.org/). It is already configured in `internals/webpack` - there are two separate configurations - for development and production.

Key Libraries:
- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [React-router](https://github.com/ReactTraining/react-router)
- [material-ui](https://material-ui.com/)

### module structure

The majority of code for the client is organised into modules, these provide a level of seperation between different functions within your application. Think very carefully before making a module depend on functionality not available in the core module.

If a module will require its own state and actions it should include the actions and configs folders, see the core module for an example. Additionally the module must be loaded in main.js.

### client side routes

To add a route to the application see the app-routes.js file in the aplication component folder of the core module, the authenticated route component available in the core module will enforce user login for a route.

### containers

A container connects a component to the context and state of the application, additionally it is generally good practice to load data in containers. Examples are available in the state-demo and data-demo component folders in the core module. 
