import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS imports
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private FLASK_API_SERVER = "http://127.0.0.1:5000/";
  private FLASK_API_ESTABLISHMENTS = "http://127.0.0.1:5000/establishments";

  constructor(private httpClient: HttpClient) { }

  public getHelloWorld() {
    return this.httpClient.get(this.FLASK_API_SERVER);
  }

  public getEstablishments(postal_code: string) {
    return this.httpClient.get(this.FLASK_API_ESTABLISHMENTS, {
      params: {
        postal_code: postal_code,
      }
    })
  }
}
