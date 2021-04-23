import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common'

import { DataService } from '../data.service';
import { EstablishmentCardComponent } from '../establishment-card/establishment-card.component';
import { AvailabilitiesPickerComponent } from '../availabilities-picker/availabilities-picker.component'

@Component({
  selector: 'app-create-alert-steps',
  templateUrl: './create-alert-steps.component.html',
  styleUrls: ['./create-alert-steps.component.scss']
})
export class CreateAlertStepsComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('availabilitiesContainer', { read: ViewContainerRef }) availabilitiesContainer: ViewContainerRef;

  @Input() postalCode: string;

  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  private establishmentResponse;

  private establishmentRefs = [];
  private datepickerRefs = [];

  public allSelected: boolean = false;
  public selectAllLabel: string = "Sélectionner tout"
  public alwaysFree: boolean = false;

  public datePickerId: number = 0;

  constructor(private _formBuilder: FormBuilder, private dataService: DataService,
    private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private _vps: ViewportScroller) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EstablishmentCardComponent);

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

        // Store reference to component
        this.establishmentRefs.push(componentRef)
      }
      this._vps.scrollToAnchor('create-alert-stepper')
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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AvailabilitiesPickerComponent);
    const componentRef = this.availabilitiesContainer.createComponent(componentFactory);

    let datePickerComponent = componentRef.instance;
    datePickerComponent.id = ++this.datePickerId;
    datePickerComponent.parentRef = this;

    this.datepickerRefs.push(componentRef)
    this._vps.scrollToAnchor('add-button')
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
  }

  setAlwaysFree() {
    this.alwaysFree = !this.alwaysFree
  }
}
