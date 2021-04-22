import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss']
})
export class EstablishmentCardComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  address: string;

  public selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onCardClick(evt: MouseEvent) {
    this.selected = !this.selected;
  }
}
