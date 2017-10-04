# nqm-app-minimal

Minimal application for use with the updated application account system

## install
```
cd nqm-app-minimal/server
npm install
cd client
jspm install
```

## commissioning
Create an **application definition** using the **nqminds toolbox**. Note the application id and secret and insert them into the
`./server/minimal-settings.js` file.

Rename ./server/minimal-settings.js and then update the start script in root package.json to reflect the name change

## server settings
Open /server/server.js and ensure an appropriate name and secret are set to ensure sessions work correctly

## public mode
Examine /server/routes/index.js

## run
```
cd server
npm start
```

## building an application

### route setup
Open /client/src/modules/core/components/application

Locate the section labelled "Define top-level routes"
React router allows defining routes dynamically in your code, a switch block can be used to select content based on the url.

If you want to define a group of routes, e.g /users/x examine /client/src/modules/core/components/user for an example.

### themes
Configured in /client/src/modules/core/containers/themed-application.js

### server actions
Examine /client/src/modules/core/actions/index.js to see examples of api calls feeding back to the user

### app initialisation
See /server/boot.js for app setup
See /client/src/configs/boot.js for setting up user datasets etc