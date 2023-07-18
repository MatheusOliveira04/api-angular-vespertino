import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedwayTableComponent } from './speedway-table.component';

describe('SpeedwayTableComponent', () => {
  let component: SpeedwayTableComponent;
  let fixture: ComponentFixture<SpeedwayTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedwayTableComponent]
    });
    fixture = TestBed.createComponent(SpeedwayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
