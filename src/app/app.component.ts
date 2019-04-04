import { Component, ViewChild } from '@angular/core';
import { NgxImgCrossfaderComponent } from 'ngx-img-crossfader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-img-crossfader';
  myImages = [
    '../assets/images/coding/0.jpg',
    '../assets/images/coding/1.jpg',
    '../assets/images/coding/2.jpg',
    '../assets/images/coding/3.jpg',
    '../assets/images/coding/4.jpg',
  ];
  index = 0;
  index2 = 4;
  myImageSources: Array<string> = [];

  @ViewChild('myCrossfader') myCrossfader: NgxImgCrossfaderComponent;

  constructor() {
    setInterval(() => {
      if (this.index < this.myImages.length) {
        this.myImageSources.push(this.myImages[this.index]);
        this.index++;
      }
    }, 1000);
  }

  next() {
    this.myCrossfader.stepForward();
  }

  back() {
    this.myCrossfader.stepBackward();
  }
}
