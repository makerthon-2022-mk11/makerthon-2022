import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodeToMessageMap } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;

  validations: Validations = {
    displayName: [
      { type: 'required', message: 'Username is required.' },
      {
        type: 'pattern',
        message: 'Username only allows _ and alphanumeric characters',
      },
    ],
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
      { type: 'notSame', message: 'Passwords do not match' },
    ],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.signUpForm = new FormGroup(
        {
          displayName: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-z0-9_]+$'),
          ]),
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
    });
  }

  validateSamePassword(pwdCtlName, pwdConCtlName): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const pwdCtl = formGroup.get(pwdCtlName);
      const pwdConCtl = formGroup.get(pwdConCtlName);

      if (pwdConCtl.dirty && pwdConCtl.value != pwdCtl.value) {
        pwdConCtl.setErrors({ notSame: true });
      } else {
        delete pwdConCtl.errors?.notSame;
      }

      return null;
    };
  }

  async signUp() {
    this.isSubmitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.signUpForm.valid) {
      const displayName = this.signUpForm.controls.displayName.value;
      const email = this.signUpForm.controls.email.value;
      const password = this.signUpForm.controls.password.value;

      const inUse = await this.userService.isDisplayNameAlreadyUsed(
        displayName
      );

      if (inUse) {
        this.errorMsg = 'This Username has already been taken';
      } else {
        this.authService
          .signUp(email, password, displayName)
          .then(() => {
            this.isSubmitted = false;
            this.authService.sendEmailVerification();
            this.signUpForm.reset();

            this.successMsg =
              'Account successfully created! Please check your email account and verify your email before logging in.';
          })
          .catch((err: FirebaseError) => {
            this.errorMsg =
              authErrorCodeToMessageMap.get(err.code) ??
              'There is a problem signing up, please try again later';
          });
      }
    }
  }

  navToLogin() {
    this.router.navigateByUrl(routePaths.LOGIN);
  }

  get controls() {
    return this.signUpForm?.controls;
  }
}
