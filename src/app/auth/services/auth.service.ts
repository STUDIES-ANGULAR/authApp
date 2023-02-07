import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth-interfaces';
import { catchError, map } from 'rxjs/operators';
import { tap, of } from 'rxjs';

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
        tap( resp => {
          if (resp.ok) {
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      )

  }
}
