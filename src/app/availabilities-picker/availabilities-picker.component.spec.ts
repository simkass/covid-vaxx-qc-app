import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitiesPickerComponent } from './availabilities-picker.component';

describe('AvailabilitiesPickerComponent', () => {
  let component: AvailabilitiesPickerComponent;
  let fixture: ComponentFixture<AvailabilitiesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilitiesPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilitiesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
