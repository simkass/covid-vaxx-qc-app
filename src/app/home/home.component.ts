import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hello;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getHelloWorld().subscribe((data: any[]) => {
      this.hello = data;
    })
    console.log(this.hello)
  }
}
