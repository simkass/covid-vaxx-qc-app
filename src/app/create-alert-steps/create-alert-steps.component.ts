import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { EstablishmentCardComponent } from '../establishment-card/establishment-card.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-alert-steps',
  templateUrl: './create-alert-steps.component.html',
  styleUrls: ['./create-alert-steps.component.scss']
})
export class CreateAlertStepsComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  cards = [];

  @Input() postal_code: string;

  private establishment_response;

  constructor(private _formBuilder: FormBuilder, private dataService: DataService, private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EstablishmentCardComponent);

    this.dataService.getEstablishments(this.postal_code).subscribe((data: any[]) => {
      this.establishment_response = data;
      for (let i = 0; i <  this.establishment_response.places.length; i++) {
        // add the component to the view
        const componentRef = this.container.createComponent(componentFactory);
        this.cards.push(componentRef)
        // pass some data to the component
        componentRef.instance.name = this.establishment_response.places[i].name_fr;
        componentRef.instance.address = this.establishment_response.places[i].formatted_address;
        componentRef.instance.id = this.establishment_response.places[i].id;
      }
    })

    this.cd.detectChanges();
  }

  selectAll(){
    for (let i = 0; i < this.cards.length; i++){
      this.cards[i].instance.selected = true;
    }
  }
}
