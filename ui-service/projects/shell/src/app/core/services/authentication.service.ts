import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

const URL = 'http://0.0.0.0:80';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  authenticate(email: string): Observable<{customer: User | null}> {
    return this.http.get<{customer: User | null}>(`${URL}/api/customer/${email}`);
  }

  register(email: string, display_name: string): Observable<User> {
    return this.http.post<User>(`${URL}/api/customer/`, {email, display_name});
  }
}
