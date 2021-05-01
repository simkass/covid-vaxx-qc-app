import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common'

import { DataService } from '../data.service';
import { EstablishmentCardComponent } from '../establishment-card/establishment-card.component';
import { AvailabilitiesPickerComponent } from '../availabilities-picker/availabilities-picker.component'
import { User } from '../user.model'
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { RecaptchaErrorParameters } from "ng-recaptcha";

@Component({
  selector: 'app-create-alert-steps',
  templateUrl: './create-alert-steps.component.html',
  styleUrls: ['./create-alert-steps.component.scss']
})
export class CreateAlertStepsComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('availabilitiesContainer', { read: ViewContainerRef }) availabilitiesContainer: ViewContainerRef;

  @Input() postalCode: string;

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public captchaFormControl = new FormControl('', [
    Validators.required
  ]);

  public isLinear: boolean = true;
  public editable: boolean = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  private establishmentResponse;

  public establishmentRefs = [];
  private selectedEstablishments = [];
  private datepickerRefs = [];
  private availabilities = [];

  public alwaysFree: boolean = false;
  public allSelected: boolean = false;
  public selectAllLabel: string = "Sélectionner tout"

  public datePickerId: number = 0;

  public emailAddress: string;

  private recaptchaResponse: string;

  constructor(private _formBuilder: FormBuilder, private dataService: DataService,
    private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: this.emailFormControl
    });
    this.thirdFormGroup.addControl('captcha', this.captchaFormControl);
  }

  ngAfterViewInit() {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EstablishmentCardComponent);
    // this.container.clear();
    // this.establishmentRefs = [];

    this.dataService.getEstablishments(this.postalCode).subscribe((data: any[]) => {
      // Store response
      this.establishmentResponse = data;

      // Create and display cards for every establishment
      for (let i = 0; i < this.establishmentResponse.places.length; i++) {
        // add the component to the view
        const componentRef = this.container.createComponent(componentFactory);

        // Set component parameters
        componentRef.instance.id = this.establishmentResponse.places[i].id;
        componentRef.instance.name = this.establishmentResponse.places[i].name_fr;
        componentRef.instance.address = this.establishmentResponse.places[i].formatted_address;
        componentRef.instance.selectable = true;

        // Store reference to component
        this.establishmentRefs.push(componentRef)
      }


    }, (err: any) => {
      if (this.establishmentRefs.length == 0) {
        const componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.id = '500';
        componentRef.instance.name = "Ce code postal n'existe pas ou est invalide";
        componentRef.instance.address = "Veuillez entrer un code postal valide";
        componentRef.instance.selectable = false;
        this.firstFormGroup.controls.firstCtrl.setValidators(Validators.required)
        this.firstFormGroup.controls.firstCtrl.updateValueAndValidity();
      }
    })

    this.addAvailabilitiesPicker();
    this.cd.detectChanges();
  }

  selectAll() {
    this.allSelected = !this.allSelected;

    if (this.allSelected) {
      this.selectAllLabel = "Désélectionner tout"
    }
    else {
      this.selectAllLabel = "Sélectionner tout"
    }

    for (let i = 0; i < this.establishmentRefs.length; i++) {
      this.establishmentRefs[i].instance.selected = this.allSelected;
    }
  }

  addAvailabilitiesPicker() {
    if (!this.alwaysFree) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AvailabilitiesPickerComponent);
      const componentRef = this.availabilitiesContainer.createComponent(componentFactory);

      let datePickerComponent = componentRef.instance;
      datePickerComponent.id = ++this.datePickerId;
      datePickerComponent.parentRef = this;

      this.datepickerRefs.push(componentRef)
      this.rebuildSecondFormGroup()
    }
  }

  removeDatepicker(key: number) {
    if (this.availabilitiesContainer.length < 2) return;

    let componentRef = this.datepickerRefs.filter(
      x => x.instance.id == key
    )[0];

    componentRef.destroy();

    // removing component from the list
    this.datepickerRefs = this.datepickerRefs.filter(
      x => x.instance.id !== key
    );
    this.rebuildSecondFormGroup()
  }

  rebuildSecondFormGroup() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });

    for (let i = 0; i < this.datepickerRefs.length; i++) {
      this.secondFormGroup.addControl("s" + i, this.datepickerRefs[i].instance.startDateForm);
      this.secondFormGroup.addControl("e" + i, this.datepickerRefs[i].instance.endDateForm);
    }
  }

  setAlwaysFree() {
    this.alwaysFree = !this.alwaysFree
    if (this.alwaysFree) {
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['']
      });
    }
    else {
      this.rebuildSecondFormGroup()
    }
  }

  submitForm() {
    // Identify selected establishments
    for (let i = 0; i < this.establishmentRefs.length; i++) {
      if (this.establishmentRefs[i].instance.selected) {
        this.selectedEstablishments.push(this.establishmentRefs[i].instance.id)
      }
    }
    // If no establishment is selected, select all
    if (this.selectedEstablishments.length == 0) {
      for (let i = 0; i < this.establishmentRefs.length; i++) {
        this.selectedEstablishments.push(this.establishmentRefs[i].instance.id)
      }
    }

    // If always free
    if (this.alwaysFree) {
      this.availabilities = [{
        "start": "2021-01-01T09:00",
        "stop": "2022-12-31T09:00"
      }]
    }
    else {
      // Identify specified availabilities
      for (let i = 0; i < this.datepickerRefs.length; i++) {
        if (this.datepickerRefs[i].instance.hasOwnProperty("startDatetime") &&
          this.datepickerRefs[i].instance.hasOwnProperty("endDatetime")) {
          if (this.datepickerRefs[i].instance.startDatetime != undefined && this.datepickerRefs[i].instance.endDatetime != undefined) {
            this.availabilities.push({
              "start": this.datepickerRefs[i].instance.startDatetime,
              "stop": this.datepickerRefs[i].instance.endDatetime
            })
          }
        }
      }
    }

    // Create user and post
    const user = new User();
    user.email = this.emailAddress;
    user.postalCode = this.postalCode
    user.establishments = this.selectedEstablishments;
    user.availabilities = this.availabilities;
    user.recaptcha = this.recaptchaResponse;
    this.editable = false;
    this.dataService.postUser(user).subscribe(data => { });
  }

  selectionChange(event: StepperSelectionEvent) {
    let stepLabel = event.selectedStep.label
    if (stepLabel == "Done") {
      this.submitForm();
    }
  }

  public resolved(captchaResponse: string): void {
    this.recaptchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  refresh(): void {
    window.location.reload();
  }
}
