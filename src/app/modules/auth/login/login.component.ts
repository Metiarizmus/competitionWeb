import {Component, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {LoginFormInterface} from "../models/login-form.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {LoginRequestInterface} from "../models/login-request.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup<LoginFormInterface>;

  public errorMessage!: Observable<string>;

  constructor(
    private fb: NonNullableFormBuilder,
    private service: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.form = this.fb.group<LoginFormInterface>({
      login: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    })
  }

  public login(): void {
    this.errorMessage = this.service.login(<LoginRequestInterface>this.form.value);
  }
}
