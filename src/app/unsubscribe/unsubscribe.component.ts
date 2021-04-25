import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  public unsubscriptionStarted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  codeFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]')])

  matcher = new MyErrorStateMatcher();

  startUnsubscription() {
    this.unsubscriptionStarted = true;
  }
}
