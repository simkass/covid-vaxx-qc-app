import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API = "https://covid-vaxx-qc-api.herokuapp.com/";
  // private API = "http://127.0.0.1:5000/";
  private ESTABLISHMENTS_API = this.API + "establishments";
  private USER_API = this.API + "user";
  private UNSUB_REQUEST_API = this.API + "unsubscribe-request";
  private UNSUB_API = this.API + "unsubscribe";

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(postalCode?: string, coordinates?: string) {
    let params = new HttpParams();

    if (postalCode) {
      console.log(postalCode)
      params = params.set('postal_code', postalCode)
    }
    else {
      if (coordinates) {
        console.log(coordinates)
        params = params.set('lat', coordinates['lat'])
        params = params.set('lng', coordinates['lng'])
      }
    }
    return this.httpClient.get(this.ESTABLISHMENTS_API, {
      params
    })
  }

  public postUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.httpClient.post(this.USER_API, body, { 'headers': headers })
  }

  public unsubscribeRequest(email: string) {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(this.UNSUB_REQUEST_API, { "email": email }, { 'headers': headers })
  }

  public unsubscribe(email: string, random_code: number) {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(this.UNSUB_API, { "email": email, "random_code": random_code }, { 'headers': headers })
  }
}
