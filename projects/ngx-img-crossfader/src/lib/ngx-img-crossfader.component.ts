import { Component, OnInit, Input, ViewChild, IterableDiffers, DoCheck, IterableDiffer, IterableChangeRecord } from '@angular/core';

@Component({
  selector: 'ngx-img-crossfader',
  template: `
    <div class="ngx-img-crossfader-div" #div>
      <canvas class="ngx-img-crossfader-canvas" #canvas></canvas>
    </div>
  `,
  styles: []
})
export class NgxImgCrossfaderComponent implements OnInit, DoCheck {

  @Input() initDelayMS = 0;
  @Input() idleTimeMS = 5000;
  @Input() transitionTimeMS = 1000;
  @Input() transitionFPS = 26;
  @Input() imageSources: Array<string> = [];
  @Input() backgroundColor = 'rgba(0,0,0,1.0)';
  @Input() mode = 'fit'; // todo: stretch, tile
  
  public log: Array<string> = [];

  private images:Array<HTMLImageElement> = [];
  private transitionStartTime: number;
  private foregroundImgNum: number = 0;
  private backgroundImgNum: number = 0;
  private isTransitioning: boolean = false;

  private _differ: IterableDiffer<string>;

  @ViewChild('div') private div;
  @ViewChild('canvas') private canvas;

  constructor(private _iterableDiffer: IterableDiffers) {
    this._differ = this._iterableDiffer.find(this.imageSources).create();
    this.imageSources.forEach((source: string) => {
      this.appendImgFromSource(source);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.idle();
    }, this.initDelayMS);
  }

  ngDoCheck() {
    let changes = this._differ.diff(this.imageSources);
    if (changes) {
      changes.forEachAddedItem((record: IterableChangeRecord<any>) => {
        this.log.push('Detected addition to imageSources ' + record.item);
        this.appendImgFromSource(record.item);
      });
      // todo: detect removal of items
    }
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
        if (this.images.length) {
          this.foregroundImgNum = this.backgroundImgNum;
          this.backgroundImgNum = (this.backgroundImgNum + 1) % this.images.length;   // 1 % 0 = NaN       
        } else {
          this.foregroundImgNum = 0;
          this.backgroundImgNum = 0;
        }
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

  public paint(): void {

    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    
    if (this.images[this.foregroundImgNum] && this.images[this.backgroundImgNum] && this.images.length > 1) {
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

  private appendImgFromSource(source: string): void {
    let img = new Image();
    img.onerror = (error) => {
      this.log.push('Failed to load ' + source);
    }
    img.onload = (event) => {
      if (<HTMLImageElement>event.target) {
        this.images.push(<HTMLImageElement>event.target);
        this.log.push('Success loading ' + source);
        if (this.images.length == 1) {
          this.log.push('First Image loaded');
          this.paint();
        }
      }
    }
    img.src = source;
  }

}
