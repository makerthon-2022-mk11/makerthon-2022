import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodeToMessageMap } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { UserService } from 'src/app/services/user.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editForm: FormGroup;
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
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.editForm = new FormGroup({
        displayName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-z0-9_]+$'),
        ]),
      });

      this.errorMsg = '';
      this.successMsg = '';
      this.isSubmitted = false;
    });
  }

  async editProfile() {
    this.errorMsg = '';
    this.successMsg = '';
    const updatedDisplayName = this.editForm.controls.displayName.value;

    const inUse = await this.userService.isDisplayNameAlreadyUsed(
      updatedDisplayName
    );

    if (inUse) {
      this.errorMsg = 'This Username has already been taken';
    } else {
      await this.userService
        .updateDisplayName(updatedDisplayName)
        .then(() => {
          this.successMsg = 'Successfully updated your username';
        })
        .catch((err: FirebaseError) => {
          this.errorMsg =
            authErrorCodeToMessageMap.get(err.code) ??
            'There is a problem updating your username, please try again later';
        });
    }
  }

  navToProfile() {
    this.router.navigateByUrl(routePaths.PROFILE);
  }

  get controls() {
    return this.editForm.controls;
  }
}
