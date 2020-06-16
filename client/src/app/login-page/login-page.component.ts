import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';


import { SignInDto } from '../../../../src/auth/dto/signin.dto';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.alert.warning('Пожалуйста, введите данные');
      } else if (params['authFailed']) {
        this.alert.warning('Сессия истекла. Введите данные заново');
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  clear() {
    this.form.reset()
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: SignInDto = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate([''])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}

