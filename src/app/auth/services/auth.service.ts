import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth-interfaces';
import { catchError, map } from 'rxjs/operators';
import { tap, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private daseUrl: string = environment.BASE_URL;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }


  login(email: string, password: string) {

    const url: string = `${this.daseUrl}/auth`;
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }


  validarToken(): Observable<boolean> {

    const url = `${this.daseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!
          }

          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }
}
