import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ESTABLISHMENTS_API = "http://127.0.0.1:5000/establishments";
  private USER_API = "http://127.0.0.1:5000/user";

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(postalCode: string) {
    return this.httpClient.get(this.ESTABLISHMENTS_API, {
      params: {
        postal_code: postalCode,
      }
    })
  }

  public postUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.httpClient.post(this.USER_API, body, { 'headers': headers })
  }
}
