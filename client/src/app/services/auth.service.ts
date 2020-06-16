import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SignInDto } from '../../../../src/auth/dto/signin.dto';
import { environment } from '../../environments/environment'
import { IReadableUser } from '../../../../src/user/interfaces/readable-user.interface'
import { AlertService } from './alert.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient,
  private alert: AlertService) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('auth-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('auth-token')
  }

  login(user: SignInDto): Observable<any> {
    return this.http.post( environment.backUrl + environment.backSignIn, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {

    const {message} = error.error

    switch (message) {
      case 'Invalid credentials':
        this.alert.danger('Неверные данные')
        break
      default:
        this.alert.danger('Ошибка проверки данных')
    }
    return throwError(error)
  }

  private setToken(response: IReadableUser | null) {

    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('auth-token', response.accessToken)
      localStorage.setItem('auth-token-exp', expDate.toString())
      localStorage.setItem('user-roles', JSON.stringify(response.roles))
    } else {
      localStorage.clear()
    }
  }
}

