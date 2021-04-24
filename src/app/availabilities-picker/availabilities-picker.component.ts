import { Component, OnInit, Input } from '@angular/core';
import { CreateAlertStepsComponent } from '../create-alert-steps/create-alert-steps.component'

@Component({
  selector: 'app-availabilities-picker',
  templateUrl: './availabilities-picker.component.html',
  styleUrls: ['./availabilities-picker.component.scss']
})
export class AvailabilitiesPickerComponent implements OnInit {

  @Input()
  public id: number;
  @Input()
  public parentRef: CreateAlertStepsComponent;

  public startDatetime;
  public endDatetime;

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.parentRef.removeDatepicker(this.id)
  }
}
