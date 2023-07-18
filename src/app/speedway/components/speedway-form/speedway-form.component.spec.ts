import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedwayFormComponent } from './speedway-form.component';

describe('SpeedwayFormComponent', () => {
  let component: SpeedwayFormComponent;
  let fixture: ComponentFixture<SpeedwayFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedwayFormComponent]
    });
    fixture = TestBed.createComponent(SpeedwayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
