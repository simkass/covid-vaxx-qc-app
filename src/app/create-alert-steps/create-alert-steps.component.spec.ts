import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlertStepsComponent } from './create-alert-steps.component';

describe('CreateAlertStepsComponent', () => {
  let component: CreateAlertStepsComponent;
  let fixture: ComponentFixture<CreateAlertStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlertStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlertStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
