import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImgCrossfaderComponent } from './ngx-img-crossfader.component';

describe('NgxImgCrossfaderComponent', () => {
  let component: NgxImgCrossfaderComponent;
  let fixture: ComponentFixture<NgxImgCrossfaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxImgCrossfaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImgCrossfaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
