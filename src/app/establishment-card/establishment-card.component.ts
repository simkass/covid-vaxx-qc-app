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
  selectable: boolean;
  @Input()
  distance: number;

  public selected: boolean = false;
  public distance_str: string

  constructor() { }

  ngOnInit(): void {
    if (this.distance == null)
      this.distance_str = ""
    else
      this.distance_str = this.distance + " km";
  }

  public onCardClick(evt: MouseEvent) {
    if (this.selectable) {
      this.selected = !this.selected;
    }
  }
}
