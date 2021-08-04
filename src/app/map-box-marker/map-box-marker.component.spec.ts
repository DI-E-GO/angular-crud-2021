import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBoxMarkerComponent } from './map-box-marker.component';

describe('MapBoxMarkerComponent', () => {
  let component: MapBoxMarkerComponent;
  let fixture: ComponentFixture<MapBoxMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapBoxMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBoxMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
