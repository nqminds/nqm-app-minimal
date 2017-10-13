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
Uses react router 4, advise reading up on this if unfamiliar https://reacttraining.com/react-router/

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

## bundling

Once your app is ready for production, you can bundle the client-side packages into a single, minified file. This
greatly improves performance and load times.

Begin by editing `client/jspm.config.js` and setting the `production` property to `true`.

Then run the bundling command:

```
cd nqm-app-minimal/client
jspm bundle ./src/main.js --minify
```

Now edit the `server/views/layout.pug` to include the bundled file, by uncommenting the line `script(src="/build.js")`

That's it. If you want to switch back to development mode, simply comment the line in `layout.pug` and reset the
production flag in `jspm.config.js` to `false`.

## deployment

To deploy as a regular nodejs server, run

```
node server/index.js --config /path/to/settings.json
```

To deploy as a databot, package up the repo as a zip file, be sure not to include the `jspm_packages/npm` or
`jspm_packages/github` folders. Also, **do not** have @nqminds/nqm-api-tdx as a dependency in `package.json` as
this might cause a conflict with the instance injected by the databot host.

When you create the databot package, you should define the application settings as `input.settings` or
`packageParams.settings`.

