import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVolumesPageComponent } from './my-volumes-page.component';

describe('MyVolumesPageComponent', () => {
  let component: MyVolumesPageComponent;
  let fixture: ComponentFixture<MyVolumesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVolumesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVolumesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
