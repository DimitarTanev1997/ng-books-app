import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeCardComponent } from './volume-card.component';

describe('BookCardComponent', () => {
  let component: VolumeCardComponent;
  let fixture: ComponentFixture<VolumeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
