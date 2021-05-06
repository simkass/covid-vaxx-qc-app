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

  public selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onCardClick(evt: MouseEvent) {
    if (this.selectable) {
      this.selected = !this.selected;
    }
  }
}
