import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  public emailAddress: string;
  public unsubscriptionStarted: boolean = false;
  public unsubscriptionNotNeeded: boolean = false;
  public unsubscriptionSuccess: boolean = false;
  public unsubscriptionFailed: boolean = false;

  public unsubRequest;
  public unsub;
  public randomCode: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  codeFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]')])

  matcher = new MyErrorStateMatcher();

  startUnsubscription() {
    this.dataService.unsubscribeRequest(this.emailAddress).subscribe((data: any[]) => {
      this.unsubRequest = data;
      if (this.unsubRequest['success']){
        this.unsubscriptionNotNeeded = false;
        this.unsubscriptionStarted = true;
      }
      else if (!this.unsubRequest['success']){
        this.unsubscriptionStarted = false;
        this.unsubscriptionNotNeeded = true;
      }
    })
  }

  completeUnsubscription() {
    this.dataService.unsubscribe(this.emailAddress, this.randomCode).subscribe((data: any[]) => {
      this.unsub = data;
      if (this.unsub['success']){
        this.unsubscriptionFailed = false;
        this.unsubscriptionSuccess = true;
      }
      else if (!this.unsub['success']){
        this.unsubscriptionSuccess = false;
        this.unsubscriptionFailed = true;
      }
    })
  }
}
