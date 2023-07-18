import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedwayComponent } from './speedway.component';

describe('SpeedwayComponent', () => {
  let component: SpeedwayComponent;
  let fixture: ComponentFixture<SpeedwayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedwayComponent]
    });
    fixture = TestBed.createComponent(SpeedwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
