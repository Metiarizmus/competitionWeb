import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequestInterface} from "../../modules/auth/models/login-request.interface";
import {catchError, Observable, of, tap} from "rxjs";
import {LoginResponseInterface} from "../models/login-response.interface";
import {LocalStorageService} from "./local-storage.service";
import {MessageService} from "primeng/api";
import {RegisterRequestInterface} from "../../modules/auth/models/register-request.interface";
import {Router} from "@angular/router";
import {Endpoints} from "../constants/endpoints";
import {AUTH_FAILURE, LOGIN_SUCCESS, REGISTER_SUCCESS} from "../constants/toaster-messages";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  public login(data: LoginRequestInterface): Observable<string> {
    return this.http.post<LoginResponseInterface>(Endpoints.LOGIN, data).pipe(
      tap((data) => {
        this.storage.setValue('token', data.token);
        this.storage.setValue('login', data.login);
        this.storage.setValue('roles', data.roles);
        this.storage.setValue('isLoggedIn', true);

        this.messageService.add({severity: 'success', summary: LOGIN_SUCCESS});

        this.router.navigate(['/main']);
      }),
      catchError(err => {
        this.messageService.add({severity: 'error', summary: AUTH_FAILURE});
        this.storage.setValue('isLoggedIn', false);
        return of('error', err.error.error)
      })
    )
  }

  public registerMembers(data: RegisterRequestInterface): Observable<string> {
    return this.http.post<string>(Endpoints.REGISTER_TEAM, data).pipe(
      tap(data => {
        this.messageService.add({severity: 'success', summary: REGISTER_SUCCESS});
      }),
      catchError(err => {
        this.messageService.add({severity: 'error', summary: AUTH_FAILURE});
        return of('error', err.error.error)
      })
    )
  }

  public logout() {
    this.storage.clear();
    this.router.navigate(['/login'])
  }


}
