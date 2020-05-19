import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeOverviewComponent } from './volume-overview.component';

describe('BookOverviewComponent', () => {
  let component: VolumeOverviewComponent;
  let fixture: ComponentFixture<VolumeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
