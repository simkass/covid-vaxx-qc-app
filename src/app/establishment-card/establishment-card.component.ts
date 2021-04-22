import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss']
})
export class EstablishmentCardComponent implements OnInit {

  @Input()
  name: string;
  @Input()
  address: string;
  @Input()
  id: string;

  selected = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onCardClick(evt: MouseEvent){
    console.log(evt);
    this.selected = !this.selected;
  }
}
