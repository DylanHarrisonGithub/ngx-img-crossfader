import { Component, OnInit } from '@angular/core';
import { NgxImgCrossfaderComponent } from 'ngx-img-crossfader'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private coding = [];
  private animals = [];
  private nature = [];
  myImages1: Array<HTMLImageElement> = this.coding;
  myImages2: Array<HTMLImageElement> = this.animals;
  myImages3: Array<HTMLImageElement> = this.nature;

  constructor() { }

  ngOnInit() {
    this.coding = [
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/coding/0.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/coding/1.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/coding/2.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/coding/3.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/coding/4.jpg'),          
    ];
    this.animals = [
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/animals/0.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/animals/1.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/animals/2.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/animals/3.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/animals/4.jpg'),  
    ];
    this.nature = [
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/nature/0.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/nature/1.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/nature/2.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/nature/3.jpg'),
      NgxImgCrossfaderComponent.imgFromSource('../../assets/images/nature/4.jpg'),
    ];
  }

}
