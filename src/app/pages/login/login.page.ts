import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
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
              this.errorMsg = 'Please enter a valid email';
              break;
            case authErrorCodes.WRONG_PASSWORD:
              this.errorMsg = 'The password is incorrect';
              break;
            case authErrorCodes.USER_DISABLED:
              this.errorMsg = 'This account has been disabled';
              break;
            case authErrorCodes.USER_NOT_FOUND:
              this.errorMsg = 'This user is not found';
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

  navToPasswordReset() {
    console.log('reset password');
  }
}
