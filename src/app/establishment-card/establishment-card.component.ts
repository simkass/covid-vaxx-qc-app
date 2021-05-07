/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss']
})
export class EstablishmentCardComponent implements OnInit {

  @Input()
  establishment: any;
  @Input()
  coordinates?: any;
  @Input()
  selectable: boolean;

  public selected: boolean = false;
  public distance: string;

  constructor() { }

  ngOnInit(): void {
    const distance = this.getDistanceFromUser();
    if (distance == null)
      this.distance = ""
    else
      this.distance = distance.toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " km";
  }

  public onCardClick(evt: MouseEvent) {
    if (this.selectable) {
      this.selected = !this.selected;
    }
  }

  getDistanceFromUser(): number {
    if (this.coordinates != undefined) {
      const userLoc = new google.maps.LatLng(this.coordinates['lat'], this.coordinates['lng']);
      const establishmentLoc = new google.maps.LatLng(this.establishment.latitude, this.establishment.longitude);
      return google.maps.geometry.spherical.computeDistanceBetween(userLoc, establishmentLoc) / 1000.0;
    }
    else {
      return null
    }
  }
}
