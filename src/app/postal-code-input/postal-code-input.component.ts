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
  selector: 'app-postal-code-input',
  templateUrl: './postal-code-input.component.html',
  styleUrls: ['./postal-code-input.component.scss']
})
export class PostalCodeInputComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy] ?[0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy][0-9]'),
  ]);

  matcher = new MyErrorStateMatcher();
}
