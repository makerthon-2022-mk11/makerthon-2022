import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodeToMessageMap } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  isSubmitted: boolean;

  validations: Validations = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],
    password: [{ type: 'required', message: 'Password is required' }],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.loginForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ]),
        password: new FormControl('', Validators.required),
      });

      this.errorMsg = '';
      this.isSubmitted = false;
    });
  }

  login() {
    this.isSubmitted = true;
    this.errorMsg = '';

    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.authService
        .login(email, password)
        .then(() => {
          this.isSubmitted = false;

          if (!this.authService.isVerified) {
            this.errorMsg =
              'Email is not verified. Please check your email account and verify this email before logging in again.';
          } else {
            this.loginForm.reset();
            this.navToHome();
          }
        })
        .catch((err: FirebaseError) => {
          this.errorMsg =
            authErrorCodeToMessageMap.get(err.code) ??
            'There is a problem logging in, please try again later';
        });
    }
  }

  navToHome() {
    this.resetMsgs();
    this.router.navigateByUrl(routePaths.HOME);
  }

  navToSignUp() {
    this.resetMsgs;
    this.router.navigateByUrl(routePaths.SIGNUP);
  }

  navToResetPassword() {
    this.resetMsgs();
    this.router.navigateByUrl(routePaths.RESET_PASSWORD);
  }

  get controls() {
    return this.loginForm.controls;
  }

  resetMsgs() {
    this.errorMsg = '';
  }
}
