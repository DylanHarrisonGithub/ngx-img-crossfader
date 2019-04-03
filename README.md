# ngx-img-crossfader

![alt text](screenshots/crossfader.gif "crossfader")

## About

Angular image crossfader component.

## Features

- Image fit with conserved aspect ratio.
- Inherit z-index from parent element.
- Configure background color, idle time, transition time, transition fps, etc. 

## Instructions

#### Installation
```
npm install ngx-img-crossfader --save
```
#### Setup
1. add ngx-img-crossfader.css into project angular.json
```JSON
"styles": [
  "styles.css",
  "node_modules/ngx-img-crossfader/ngx-img-crossfader.css"
]
```
2. Import NgxImgCrossfaderModule into app.module.ts and add to imports.
```TypeScript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxImgCrossfaderModule } from 'ngx-img-crossfader';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxImgCrossfaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
3. Import NgxImgCrossfaderComponent in desired components.ts and template
```TypeScript
...
import { NgxImgCrossfaderComponent } from 'ngx-img-crossfader';
...
```
```Html
...
<ngx-img-crossfader [images]="myImages"></ngx-img-crossfader>
...
```
#### Inputs
- idleTimeMS: Time between transitions in MS, Default: 5000
- transitionTimeMS: Transition time in MS. Default: 1000
- transitionFPS: Transition frames per sec. Default: 26
- images: Array of HTMLImageElements to crossfade
- backgroundColor: Background color. Default: 'rgba(0,0,0,1.0)';
