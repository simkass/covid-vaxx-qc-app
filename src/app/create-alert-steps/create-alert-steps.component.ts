import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common'

import { DataService } from '../data.service';
import { EstablishmentCardComponent } from '../establishment-card/establishment-card.component';

@Component({
  selector: 'app-create-alert-steps',
  templateUrl: './create-alert-steps.component.html',
  styleUrls: ['./create-alert-steps.component.scss']
})
export class CreateAlertStepsComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() postalCode: string;

  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  private establishment_response;

  private cards = [];
  public allSelected: boolean = false;
  public selectAllLabel: string = "Sélectionner tout"



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
      this.establishment_response = data;

      // Create and display cards for every establishment
      for (let i = 0; i < this.establishment_response.places.length; i++) {
        // add the component to the view
        const componentRef = this.container.createComponent(componentFactory);

        // Set component parameters
        componentRef.instance.id = this.establishment_response.places[i].id;
        componentRef.instance.name = this.establishment_response.places[i].name_fr;
        componentRef.instance.address = this.establishment_response.places[i].formatted_address;

        // Store reference to component
        this.cards.push(componentRef)
      }
      this._vps.scrollToAnchor('create-alert-stepper')
    })
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

    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].instance.selected = this.allSelected;
    }
  }
}
