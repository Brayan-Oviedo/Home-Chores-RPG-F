import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user/user';
import { Observable } from 'rxjs';
import { UserCredentials } from 'src/app/model/user/user-credentials';
import { Jwt } from 'src/app/model/jwt/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE = environment.URL_BASE + 'auth';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  register(user: User): Observable<Object> {
    return this.http.post(this.URL_BASE + '/register', user, this.httpOptions);
  }

  login(user: UserCredentials): Observable<Jwt> {
    return this.http.post<Jwt>(this.URL_BASE + '/login', user, this.httpOptions);
  }

}
