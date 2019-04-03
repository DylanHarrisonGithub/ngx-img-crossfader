import { Component } from '@angular/core';
import { NgxImgCrossfaderComponent } from 'ngx-img-crossfader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-img-crossfader';
  myImages: Array<HTMLImageElement> = [
    NgxImgCrossfaderComponent.imgFromSource('../assets/images/coding/0.jpg'),
    NgxImgCrossfaderComponent.imgFromSource('../assets/images/coding/1.jpg'),
    NgxImgCrossfaderComponent.imgFromSource('../assets/images/coding/2.jpg'),
    NgxImgCrossfaderComponent.imgFromSource('../assets/images/coding/3.jpg'),
    NgxImgCrossfaderComponent.imgFromSource('../assets/images/coding/4.jpg'),
  ];
}
