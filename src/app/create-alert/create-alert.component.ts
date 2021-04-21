import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CreateAlertStepsComponent } from '../create-alert-steps/create-alert-steps.component';
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
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  postal_code

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz] ?[0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]'),
  ]);

  matcher = new MyErrorStateMatcher();

  start_creation(): void {

    // Clear creation form
    this.container.clear();

    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateAlertStepsComponent);

    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    componentRef.instance.postal_code = this.postal_code
  }
}
