import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ESTABLISHMENTS_API = "http://127.0.0.1:5000/establishments";

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(postalCode: string) {
    return this.httpClient.get(this.ESTABLISHMENTS_API, {
      params: {
        postal_code: postalCode,
      }
    })
  }
}
