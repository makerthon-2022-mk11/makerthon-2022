import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodeToMessageMap } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;

  validations: Validations = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.resetPasswordForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ]),
      });
      this.errorMsg = '';
      this.successMsg = '';
      this.isSubmitted = false;
    });
  }

  resetPassword() {
    this.isSubmitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.controls.email.value;

      this.authService
        .resetPassword(email)
        .then(() => {
          this.successMsg =
            'An email has been sent to your email account, please reset your password there';
        })
        .catch((err: FirebaseError) => {
          this.errorMsg =
            authErrorCodeToMessageMap.get(err.code) ??
            'There is a problem resetting your password, please try again later';
        });
    }
  }

  navToLogin() {
    this.resetMsgs();
    this.router.navigateByUrl(routePaths.LOGIN);
  }

  get controls() {
    return this.resetPasswordForm.controls;
  }

  resetMsgs() {
    this.errorMsg = '';
    this.successMsg = '';
  }
}
