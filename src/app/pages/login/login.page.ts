import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.errorMsg = '';
  }

  ngOnInit() {}

  login() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (email && password) {
      this.authService
        .login(email, password)
        .then(() => {
          if (!this.authService.isVerified) {
            this.errorMsg =
              'Email is not verified. Please check your email account and verify this email before logging in again.';
          } else if (this.authService.isLoggedIn) {
            this.navToHome();
          } else {
          }
        })
        .catch((err: FirebaseError) => {
          switch (err.code) {
            case authErrorCodes.INVALID_EMAIL:
              this.errorMsg = authErrorMessages.INVALID_EMAIL;
              break;
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
}
