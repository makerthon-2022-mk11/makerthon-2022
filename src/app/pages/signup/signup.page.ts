import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorMessages } from 'src/app/constants/auth-errors.constants';
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
  isSubmitted: boolean;

  validationMsgs = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Passwords should have at least 6 characters',
      },
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Please re-enter your password' },
      { type: 'notSamePassword', message: 'Passwords do not match' },
    ],
  };

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      },
      {
        validators: this.validateSamePassword(
          'password',
          'passwordConfirmation'
        ),
      }
    );
    this.errorMsg = '';
    this.successMsg = '';
    this.isSubmitted = false;
  }

  ngOnInit() {}

  validateSamePassword(pwdCtlName, pwdConCtlName): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const pwdCtl = formGroup.get(pwdCtlName);
      const pwdConCtl = formGroup.get(pwdConCtlName);

      if (pwdConCtl.dirty && pwdConCtl.value != pwdCtl.value) {
        pwdConCtl.setErrors({ notSamePassword: true });
      } else {
        pwdConCtl.setErrors(null);
      }

      return null;
    };
  }

  signUp() {
    this.isSubmitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.signUpForm.valid) {
      const email = this.signUpForm.controls.email.value;
      const password = this.signUpForm.controls.password.value;

      this.authService
        .signUp(email, password)
        .then(() => {
          this.isSubmitted = false;
          this.authService.sendEmailVerification();
          this.signUpForm.reset();

          this.successMsg =
            'Account successfully created! Please check your email account and verify your email before logging in.';
        })
        .catch((err: FirebaseError) => {
          switch (err.code) {
            case authErrorCodes.EMAIL_EXISTS:
              this.errorMsg = authErrorMessages.EMAIL_EXISTS;
              break;
            case authErrorCodes.EMAIL_PASSWORD_ACCOUNTS_DISABLED:
              this.errorMsg =
                authErrorMessages.EMAIL_PASSWORD_ACCOUNTS_DISABLED;
              break;
            default:
              this.errorMsg =
                'There is a problem signing up, please try again later';
          }
        });
    }
  }

  navToLogin() {
    this.router.navigateByUrl(routePaths.LOGIN);
  }

  get controls() {
    return this.signUpForm.controls;
  }
}
