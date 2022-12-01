import {Component, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {LoginFormInterface} from "../models/login-form.interface";
import {RegisterFormInterface} from "../models/register-form.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {RegisterRequestInterface} from "../models/register-request.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup<RegisterFormInterface>;

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
    this.form = this.fb.group<RegisterFormInterface>({
      groupName: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      teamName: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      countMembers: this.fb.control(0, [Validators.required]),
    })
  }

  public registration(): void {
    this.errorMessage = this.service.registerMembers(<RegisterRequestInterface>this.form.value)
  }
}
