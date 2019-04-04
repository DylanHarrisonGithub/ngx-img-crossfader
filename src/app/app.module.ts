import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxImgCrossfaderModule } from 'ngx-img-crossfader';

@NgModule({
  declarations: [
    AppComponent
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
