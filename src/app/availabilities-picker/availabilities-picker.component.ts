import { Component, OnInit, Input } from '@angular/core';
import { CreateAlertStepsComponent } from '../create-alert-steps/create-alert-steps.component'
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import {formatDate} from '@angular/common';

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

  public today = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');

  constructor() { }

  ngOnInit(): void {
  }

  public startDateForm = new FormControl('', [this.startDateValidator()]);
  public endDateForm = new FormControl('', [this.endDateValidator()]);

  remove() {
    this.parentRef.removeDatepicker(this.id)
  }

  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const stop = this.endDatetime;

      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      const invalidDateResp = control.value >= stop
        ? { invalidDate: 'Vous ne pouvez choisir une date plus récente que la date de fin' }
        : null;

      const resp = control.value < this.today ? { beforeToday: "Vous ne pouvez choisir une date dans le passé" } : invalidDateResp;

      return resp
    }
  }

  endDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const start = this.startDatetime;

      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return control.value <= start
        ? { invalidDate: 'Vous ne pouvez choisir une date moins récente que la date de début' }
        : null;
    }
  }
}
