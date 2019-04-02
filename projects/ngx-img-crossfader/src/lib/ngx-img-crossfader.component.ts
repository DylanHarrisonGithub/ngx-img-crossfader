import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-img-crossfader',
  template: `
    <div class="ngx-img-crossfader-div" #div>
      <canvas class="ngx-img-crossfader-canvas" #canvas></canvas>
    </div>
  `,
  styles: []
})
export class NgxImgCrossfaderComponent implements OnInit {

  @Input() initDelayMS = 0;
  @Input() idleTimeMS = 5000;
  @Input() transitionTimeMS = 1000;
  @Input() transitionFPS = 26;
  @Input() images:Array<HTMLImageElement> = [];
  @Input() backgroundColor = 'rgba(0,0,0,1.0)';
  @Input() mode = 'fit'; //stretch, tile
  
  @ViewChild('div') private div;
  @ViewChild('canvas') private canvas;

  private transitionStartTime: number;
  private foregroundImgNum: number = 0;
  private backgroundImgNum: number = 1;
  private isTransitioning: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.idle();
    }, this.initDelayMS)
  }

  private idle(): void {
    setTimeout(() => {
      this.transitionStartTime = Date.now();
      this.isTransitioning = true;
      this.transition();
    }, this.idleTimeMS)
  }

  private transition(): void {
    setTimeout(() => {
      this.paint();
      let dt = Date.now() - this.transitionStartTime;
      if (dt < this.transitionTimeMS) {
        this.transition();
      } else {
        this.isTransitioning = false;
        this.foregroundImgNum = this.backgroundImgNum;
        this.backgroundImgNum = (this.backgroundImgNum + 1) % this.images.length;
        this.idle();
      }
    },
    1000/this.transitionFPS)
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      this.canvas.nativeElement.width = this.div.nativeElement.clientWidth;
      this.canvas.nativeElement.height = this.div.nativeElement.clientHeight;
      this.paint();
    });
    this.canvas.nativeElement.width = this.div.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.div.nativeElement.clientHeight;
    this.paint();
  }

  private paint(): void {

    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // fill background
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    
    if (this.images.length > 1) {
      if (this.isTransitioning) {
        ctx.save();
  
        ctx.globalAlpha = this.transitionOpacityFunction();
        let imgLayout = this.computeImgLayout(this.images[this.backgroundImgNum]);
        ctx.drawImage(this.images[this.backgroundImgNum], imgLayout.x, imgLayout.y, imgLayout.width, imgLayout.height);
  
        ctx.globalAlpha = 1 - this.transitionOpacityFunction();
        imgLayout = this.computeImgLayout(this.images[this.foregroundImgNum]);
        ctx.drawImage(this.images[this.foregroundImgNum], imgLayout.x, imgLayout.y, imgLayout.width, imgLayout.height);
  
        ctx.restore();
      } else {
        console.log('we out here');
        let imgLayout = this.computeImgLayout(this.images[this.foregroundImgNum]);
        ctx.drawImage(this.images[this.foregroundImgNum], imgLayout.x, imgLayout.y, imgLayout.width, imgLayout.height);
      }
    } else {
      if (this.images.length) {
        let imgLayout = this.computeImgLayout(this.images[0]);
        ctx.drawImage(this.images[0], imgLayout.x, imgLayout.y, imgLayout.width, imgLayout.height);
      }
    }
        
  }

  private computeImgLayout(img: HTMLImageElement): any {
    let imgRatio = img.width / img.height;
    let canvasRatio = this.canvas.nativeElement.width / this.canvas.nativeElement.height;
    let width, height, x, y;
    if (canvasRatio <= imgRatio) {
      width = this.canvas.nativeElement.width;
      height = (img.height*this.canvas.nativeElement.width)/img.width;
      x = 0;
      y = (this.canvas.nativeElement.height - height) / 2;
    } else {
      width = (img.width*this.canvas.nativeElement.height)/img.height;
      height = this.canvas.nativeElement.height;
      x = (this.canvas.nativeElement.width - width) / 2;
      y = 0;
    }
    return { x: x, y: y, width: width, height: height };
  }

  private transitionOpacityFunction(): number {
    let dt = Date.now() - this.transitionStartTime;
    return (1 - Math.cos( (Math.PI*dt)/this.transitionTimeMS )) / 2;
  }

  public static imgFromSource(source: string): HTMLImageElement {
    let img = new Image();
    img.src = source;
    return img;
  }

}
