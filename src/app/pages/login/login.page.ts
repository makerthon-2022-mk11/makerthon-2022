import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorMessages } from 'src/app/constants/auth-errors.constants';
import { authErrorCodes } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMsg: String;
  isSubmitted: boolean;

  validationMsgs = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],
    password: [{ type: 'required', message: 'Password is required' }],
  };

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      password: new FormControl('', Validators.required),
    });

    this.errorMsg = '';
    this.isSubmitted = false;
  }

  ngOnInit() {}

  login() {
    this.isSubmitted = true;

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
          } else if (this.authService.isLoggedIn) {
            this.loginForm.reset();
            this.navToHome();
          }
        })
        .catch((err: FirebaseError) => {
          switch (err.code) {
            case authErrorCodes.WRONG_PASSWORD:
              this.errorMsg = authErrorMessages.WRONG_PASSWORD;
              break;
            case authErrorCodes.USER_DISABLED:
              this.errorMsg = authErrorMessages.USER_DISABLED;
              break;
            case authErrorCodes.USER_NOT_FOUND:
              this.errorMsg = authErrorMessages.USER_NOT_FOUND;
              break;
            default:
              this.errorMsg =
                'There is a problem logging in, please try again later';
          }
        });
    }
  }

  navToHome() {
    this.router.navigateByUrl(routePaths.HOME);
  }

  navToSignUp() {
    this.router.navigateByUrl(routePaths.SIGNUP);
  }

  resetPassword() {
    const email = this.loginForm.controls.email.value;

    this.authService
      .resetPassword(email)
      .catch((err: FirebaseError) => {
        switch (err.code) {
          case authErrorCodes.INVALID_EMAIL:
            this.errorMsg = authErrorMessages.INVALID_EMAIL;
          case authErrorCodes.USER_NOT_FOUND:
            this.errorMsg = authErrorMessages.USER_NOT_FOUND;
          default:
            this.errorMsg =
              'There is a problem resetting your password, please try again later';
        }
      })
      .then(() => {
        this.errorMsg =
          'An email has been sent to your email account, please reset your email there';
      });
  }

  get controls() {
    return this.loginForm.controls;
  }
}
