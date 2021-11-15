
## React Widget for cumulocity project

 This Demo Widget created using Angular Library and later deploy it in App Builder as cumulocity widget.
  It fetches Inventory data based on the device id and displays the same in a widget.
  It also updates the device name by taking an input from the user.
## Prerequisites:

Angular CLI version 8. (for example: npm i @angular/cli@8.3.25 in your workspace or execute npm i -g @angular/cli@8.3.25 for global installation)

### Create Angular Library project

Execute below commands to setup New Angular Library Project for widget development.

1.  Create new Angular Project with the name of your choice.
    
    ```
    ng new Project-Name
    Example: cumulocity-react-demo-widget
    
    ```
    
2.  Create Library project for our widget.
```
 cd Project-Name
 ng generate library library-name
 Example: react-demo-widget
 ```
 
3.  Install Cumulocity Libraries(Mandatory for widget development)
    
     npm install @c8y/client@1006.3.0
     npm install @c8y/ngx-components@1006.3.0 
    
4.  Add below script command in Project-Name/package.json file in script section to create shortcut for build and serve(Optional).
    
"buildPatch": "cd projects/library-name && npm version patch && ng build library-name && cd  ../../dist/library-name && npm pack && move *.tgz ../",

"buildMinor": "cd projects/library-name && npm version minor && ng build library-name && cd  ../../dist/library-name && npm pack && move *.tgz ../",

"buildMajor": "cd projects/library-name && npm version major && ng build library-name && cd ../../dist/library-name && npm pack && move *.tgz ../",

"serve": "ng build library-name && npm i dist/library-name && ng s"
    
   Note: Please replace "library-Name" with your library name(e.g. react-demo-widget)


## Configure Proxy for Cumulocity API calls

Here are steps to setup proxy for Cumulocity API. This will help to develop and test widget locally without using cumulocity platform. If your widget is not using any cumulocity api then you can ignore this step.

1.  Create new file "proxy-conf.json" in Project-Name/src location
    
2.  Copy the below json in proxy-conf.json file and modify target based on your cumulocity server:
    
    ```
     {
     "/": {
     "target": "http://tenant.cumulocity.com",
     "secure": false,
     "changeOrigin": true,
     "logLevel": "info"
         }
     }
    
    ```
    
3.  Add proxy-conf.json file path in your angular.json file. We need to add it in "Serve" section. See "ProxyConfig" entry in below "Serve" section.
    
    ```
    "serve": {
       "builder": "@angular-devkit/build-angular:dev-server",
       "options": {
         "browserTarget": "DemoApplication:build",
         "proxyConfig": "src/proxy-conf.json"
       },
       "configurations": {
         "production": {
           "browserTarget": "DemoApplication:build:production"
         }
       }
     },
    
    ```
    
4.  Create "fetchClient" object by adding below code in your Project-Name/src/app/app.module.ts file.
    
    ```
      import { Client, BasicAuth } from '@c8y/client';
      const auth = new BasicAuth({
      user: 'userName',
      password: '#####',
      tenant: 'tenant id'
      });
      const client = new Client(auth, 'http://localhost:4200');
      client.setAuth(auth);
      const fetchClient = client.core;
    
    ```
    
5.  Intialize provider for your cumulocity api in Project-Name/src/app.module.ts file.
    
    ```
    providers: [
    {
    provide: InventoryService,
    useFactory: () => {
        return new InventoryService(fetchClient);
        }v
        ,{ provide:  FetchClient, useValue:  client.core }
    }]
    
    ```
    

Note: We need to initialize provider for each service and also import necessary providers for example: import { InventoryService} from '@c8y/client';

## Widget Development

For widget development using ReactJs, follow the below link.
https://github.com/SoftwareAG/cumulocity-sample-react-library

1. Follow the step 2 or 3 to create a library and use it in your project.

Follow the steps to create react library widget (give the link here and generate .tgz file)

2. Create a folder with the name "binary"  and place the copied .tgz file under this folder.
3. Run the below command to add the widget library you just created to this project.
```
npm i ./binary/react-library-file-name.
Example:  npm i ./binary/sample-react-library1.1.0.6.tgz
```
   Add your react library widget in Project-Name/projects/Library-Name/src/lib folder

4. If you have published the react widget library on npm then you can install it using
npm react-library-name. 
```
npm i react-library-name
npm i sample-react-library1@1.0.6
```
5. Replace the code in library-name.component.ts file with the below piece of code

```
import { AfterViewInit, Component, Input, OnChanges} from  '@angular/core';
import { FetchClient } from  '@c8y/client';
import  *  as  React  from  'react';
import  *  as  ReactDOM  from  'react-dom';
import { FetchDeviceDetails } from  'sample-react-library1/lib';

@Component({
selector:  'cumulocity-react-demo-widget',
template:  '<div [id]="rootId"></div>',
styleUrls: ['./react-demo-widget.component.css']
})

export  class  ReactDemoWidgetComponent  implements  OnChanges, AfterViewInit {
@Input() config;
public  rootId = 'fetch-device-details';
private  hasViewLoaded = false;
  
constructor(public  fetchClient: FetchClient) {}

public  ngOnChanges() {
this.renderComponent();
}

public  ngAfterViewInit() {
this.hasViewLoaded = true;
this.renderComponent();
}

private  renderComponent() {
if (!this.hasViewLoaded) {
return;
} 

ReactDOM.render(
React.createElement(FetchDeviceDetails,{'fetchClient':  this.fetchClient  as  any, 'id':'deviceId'}),
document.getElementById(this.rootId)
);
}
}
```

Install the below dependencies:
```
npm install react
npm install react-dom
```
    Create a library-name.config.ts,html,css file and add the below piece of code in it.
```
 import {Component, Input} from  '@angular/core';

@Component({
selector:  'lib-config-demo-widget',
templateUrl:  './react-demo-widget.config.html',
styleUrls: ['./react-demo-widget.config.css']
})

export  class  ReactDemoWidgetConfig {
@Input() config: any = {};
}
```
6. Add the imports for HOOK_COMPONENTS

7. Add your widget hook in library module at Project-Name/projects/Library-Name/src/lib/your-module.ts. See below example:
    
 
 ``` @NgModule({
declarations: [ReactDemoWidgetComponent,ReactDemoWidgetConfig],
imports: [
],
entryComponents: [ReactDemoWidgetComponent, ReactDemoWidgetConfig],
providers: [
{
provide:  HOOK_COMPONENTS,
multi:  true,
useValue: {
id:  'react-demo-widget',
label:  'Cumulocity React Demo Widget',
description:  'This is my first cumulocity react demo widget',
component:  ReactDemoWidgetComponent,
configComponent:  ReactDemoWidgetConfig,
data : {
ng1 : {
options: { noDeviceTarget:  false,
noNewWidgets:  false,
deviceTargetNotRequired:  false,
groupsSelectable:  true
},
}
}
}
}],
exports: [ReactDemoWidgetComponent, ReactDemoWidgetConfig]
```
    
8. Add your component selector in src/app.component.html for example:
    
    ```
    <cumulocity-react-demo-widget></cumulocity-react-demo-widget>
    
    ```
    
9. Import your widget module(example: ReactDemoWidgetModule) in /src/app.module.ts for local development and testing. for example:
    
    ```
    import { Your-Library-Module } from './../../projects/Library-Name/src/lib/Library-Module-file-Name.ts';
    
    ```

## Local development server  

Run  `npm run serve`  for a dev server. Navigate to  `http://localhost:4200/`. 

## Installation

1.  Create a Minorbuild binary file from the source code.
    
    Follow the below-specified command to create a Minorbuild binary file
    
    i) Run npm i command to install all library files specified in source code
    
    `npm i`
    
    ii) Run npm run buildMinor command to create a binary file under dist folder
    
    `npm run buildMinor`
    
    iii) Copy the binary file  **react-demo-widget-0.x.x.tgz**  the latest one from the dist folder and Place the binary file under any folder.


## Deployment Of Demo widget In App Builder

1. Install the binary file in App Builder

To Install the binary file in App Builder, run the following command.

`npm i <binary file path>`

Example: npm i <binary file path>\react-demo-widget-1.0.0.tgz

After installation see that your App Builder has following entry in  `package.json` .

"cumulocity-react-runtime-widget": "file:../../minor-build-widgetv3/cumulocity-react-runtime-widget-0.4.0.tgz",
 
 2. Import Demo Widget Module

Import ReactDemoWidgetModule in cumulocity-app-builder\custom-widgets\custom-widgets.module.ts and also place the imported Module under  `@NgModule`.

```
import { ReactDemoWidgetModule } from 'cumulocity-react-runtime-widget';

@NgModule({
  imports: [
    ReactDemoWidgetModule
      ]
  })

```
3. Development server

 - Using  `package.json Scripts`
		run  `npm i`
		
 - Update package.json start script

```
"scripts": {

  "start": "c8ycli server --env.extraWebpackConfig=./extra-webpack.config.js  -u <http://cumulocity_tenant>",

  },

```

Run  `npm run start` for a dev server. Navigate to  `http://localhost:9000/apps/app-builder/`. The app will automatically reload if you change any of the source files.

 - Build

Using  `package.json Scripts`

Update package.json start script

```
"scripts": {
  "build": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js",
  },

```

Run  `npm run build`

 -  Deploy widget to the App Builder

 Using  `package.json Scripts`

Update package.json start script

```
"scripts": {
  "deploy": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js -u <http://cumulocity_tenant>",
  },

```

## Want to create runtime loading widget? (Optional)

#### Follow the below steps to convert library widget into runtime

1.  Add below script command in the script section of package.json( the one in the root folder) to create shortcut for runtime.

"scripts":{ "runtime": "gulp --gulpfile ./runtime/gulpfile.js" }

2.  Install the following libararies(as dev dependencies) by executing below command.

```
npm i gulp-inject-string@1.1.2 ng-packagr@9.1.1 css-loader@3.5.3 del@5.1.0 delay@4.3.0 fs-extra@9.0.0 gulp@4.0.2 gulp-filter@6.0.0 gulp-replace@1.0.0 gulp-zip@5.0.1 url-loader@4.1.0 webpack@4.43.0 webpack-cli@3.3.11 webpack-external-import@2.2.3 --save-dev

```

3.  Copy the runtime folder from this project into your angular project.
4.  Edit the name and interleave values in the runtime/package.json to include the new contextPath.
 Important: Leave the -CustomWidget on the interleave option, and don't edit the dist/bundle-src/custom-widget.js part

```
{
  "name": "demo-runtime-widget",
  "interleave": {
    "dist\\bundle-src\\custom-widget.js": "react-demo-runtime-widget-CustomWidget",
    "dist/bundle-src/custom-widget.js": "react-demo-runtime-widget-CustomWidget"
  },
}

```

5.  Edit the contextPath and applicationKey values in the runtime/cumulocity.json file to include the contextPath (Feel free to edit the name and icon):

```
{

"name": "First Runtime Widget",
"contextPath": "first-runtime-widget",
"key": "first-runtime-widget-application-key",
"contentSecurityPolicy": "default-src 'self'",
"icon": {
"class": "fa fa-delicious"
},
"manifest": {
"noAppSwitcher": true
}
}
```

6.  Edit the entry file in the runtime/ng-package.json file. Update the entry file path, so that it points to public-api.ts of your library project.

```

{
"$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
"assets": [
"styles/**/*"
],
"lib": {
"entryFile": "../projects/react-demo-widget/src/public-api.ts",
"umdModuleIds": {
"@c8y/ngx-components": "@c8y/ngx-components"
},
"flatModuleFile": "custom-widget"
},
"whitelistedNonPeerDependencies": ["."],
"dest": "dist/widget-library"
}

```

7.  Add the custom css in runtime/styles/index.css file in runtime folder.
    
8.  Build the widget
    
  npm run runtime

9.  After the build completes the /dist folder will contain a zip file, this is your deployable widget
    

On the successful deployment of the widget, login to cumulocity tenant URL and basic login credentials

1.  Open the Application Builder from the app switcher (Next to your username in the top right)
2.  Click Add application
3.  Enter the application details and click Save
4.  Select Add dashboard 
5.  Click Blank Dashboard  
6.  Enter the dashboard details and click Save
7.  Select the dashboard from the navigation
8.  Check for your widget and test it out.
    

## User Guide

Click on Add Widget and select Demo Widget as a widget. In the configuration, you only need to select the device.
  

