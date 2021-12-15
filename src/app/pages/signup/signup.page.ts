import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodes } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  errorMsg: String;
  successMsg: String;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      reenteredPassword: new FormControl(''),
    });
    this.errorMsg = '';
    this.successMsg = '';
  }

  ngOnInit() {}

  signUp() {
    const email = this.signUpForm.controls.email.value;
    const password = this.signUpForm.controls.password.value;
    const reenteredpassword = this.signUpForm.controls.reenteredPassword.value;

    if (password !== reenteredpassword) {
      this.errorMsg = 'Password and re-entered password do not match.';
      this.successMsg = '';
      return;
    }

    if (email && password) {
      this.authService
        .signUp(email, password)
        .catch((err: FirebaseError) => {
          this.successMsg = '';
          switch (err.code) {
            case authErrorCodes.EMAIL_EXISTS:
              this.errorMsg =
                'This email is already associated with an account. Try logging in instead.';
              break;
            case authErrorCodes.INVALID_EMAIL:
              this.errorMsg =
                'Email entered is invalid. Please try a different email.';
              break;
            case authErrorCodes.EMAIL_PASSWORD_ACCOUNTS_DISABLED:
              this.errorMsg = 'Email/Password accounts are not enabled.';
              break;
            case authErrorCodes.WEAK_PASSWORD:
              this.errorMsg = 'Password should be at least 6 characters long.';
              break;
            default:
              this.errorMsg =
                'There is a problem signing up, please try again later';
          }
        })
        .then(() => {
          this.authService.sendEmailVerification();
          this.successMsg =
            'Account Successfully created! Please check your email account and verify your email before loggin in.';
          this.errorMsg = '';
        });
    }
  }

  navToLogin() {
    this.router.navigateByUrl(routePaths.LOGIN);
  }
}
