import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-img-crossfader',
  template: `
    <div class="ngx-img-crossfader-div" #bkgCrossfaderDiv>
      <img class="ngx-img-crossfader-img" [src]="getSrc(getImg1Num())" #bkgCrossfaderImg1>
      <img class="ngx-img-crossfader-img ngx-img-crossfader-transparent" [src]="getSrc(getImg2Num())" #bkgCrossfaderImg2>
    </div>
  `,
  styles: []
})
export class NgxImgCrossfaderComponent implements OnInit {

  @Input() initDelayMS: number = 0;
  @Input() idleTimeMS: number = 5000;
  @Input() transitionTimeMS: number = 1000;
  @Input() autoAdvance: boolean = true;
  @Input() imageSources: Array<string> = [];
  @Input() backgroundColor: string = 'rgba(0,0,0,1.0)';
  
  @ViewChild('bkgCrossfaderDiv') private bkgCrossfaderDiv;
  @ViewChild('bkgCrossfaderImg1') private bkgCrossfaderImg1;
  @ViewChild('bkgCrossfaderImg2') private bkgCrossfaderImg2;

  private div: HTMLDivElement;
  private img1: HTMLImageElement;
  private img2: HTMLImageElement;
  private img1Num: number = 0;
  private img2Num: number = 1;

  constructor() { }

  ngOnInit() {
    this.div = <HTMLDivElement>this.bkgCrossfaderDiv.nativeElement;
    this.img1 = <HTMLImageElement>this.bkgCrossfaderImg1.nativeElement;
    this.img2 = <HTMLImageElement>this.bkgCrossfaderImg2.nativeElement;

    this.div.style.backgroundColor = this.backgroundColor;
    this.img1.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
    this.img1.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
    this.img2.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
    this.img2.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';    
    setTimeout(() => {
      this.idle();
    }, this.initDelayMS);
  }

  private idle(): void {
    setTimeout(() => {
      if (this.autoAdvance) {
        this.transition();
      } else {
        this.idle();
      }
    }, this.idleTimeMS);
  }

  private transition(): void {
    if (this.imageSources.length > 1) {
      if (this.img1.classList.contains('ngx-img-crossfader-transparent')) {
        this.img1Num = (this.img2Num + 1) % this.imageSources.length;
      } else {
        this.img2Num = (this.img1Num + 1) % this.imageSources.length;
      }      
      this.img1.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.classList.toggle('ngx-img-crossfader-transparent');
      this.img2.classList.toggle('ngx-img-crossfader-transparent');      
      setTimeout(() => {
        this.idle();
      }, this.transitionTimeMS);     
    }
  }

  stepForward() {
    if (this.imageSources.length > 1) {
      if (this.img1.classList.contains('ngx-img-crossfader-transparent')) {
        this.img1Num = (this.img2Num + 1) % this.imageSources.length;
      } else {
        this.img2Num = (this.img1Num + 1) % this.imageSources.length;
      }      
      this.img1.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.classList.toggle('ngx-img-crossfader-transparent');
      this.img2.classList.toggle('ngx-img-crossfader-transparent');
    }
  }

  stepBackward() {
    if (this.imageSources.length > 1) {
      if (this.img1.classList.contains('ngx-img-crossfader-transparent')) {
        this.img1Num = (this.img2Num - 1 + this.imageSources.length) % this.imageSources.length;
      } else {
        this.img2Num = (this.img1Num - 1  + this.imageSources.length) % this.imageSources.length;
      }      
      this.img1.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.transitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img2.style.webkitTransitionDuration = this.transitionTimeMS.toString() +'ms';
      this.img1.classList.toggle('ngx-img-crossfader-transparent');
      this.img2.classList.toggle('ngx-img-crossfader-transparent');
    }
  }

  getSrc(imgNum: number): string {
    if (imgNum < this.imageSources.length) {
      return this.imageSources[imgNum];
    } else {
      if (this.imageSources.length) {
        return this.imageSources[0];
      } else {
        return null;
      }
    }
  }

  getImg1Num(): number {return this.img1Num}
  getImg2Num(): number {return this.img2Num}

}
