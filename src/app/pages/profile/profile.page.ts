import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validations } from 'src/app/types/form.types';
import { FirestoreError } from 'firebase/firestore';
import { firestoreErrorCodeToMessageMap } from 'src/app/constants/store.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editForm: FormGroup;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;
  email: string;

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.editForm = new FormGroup({
        displayName: new FormControl(this.userService.user.displayName, [
          Validators.required,
          Validators.pattern('^[a-zA-z0-9_]+$'),
        ]),
      });

      this.email = this.userService.user.email;
      this.errorMsg = '';
      this.successMsg = '';
      this.isSubmitted = false;
    });
  }

  async edit() {
    this.isSubmitted = true;
    this.errorMsg = '';
    this.successMsg = '';

    if (this.editForm.valid) {
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
            this.isSubmitted = false;
            this.successMsg = 'Successfully updated your username';
          })
          .catch((err: FirestoreError) => {
            this.errorMsg =
              firestoreErrorCodeToMessageMap.get(err.code) ??
              'There is a problem updating your username, please try again later';
          });
      }
    }
  }

  get displayName(): string {
    return this.userService.user.displayName;
  }

  get controls() {
    return this.editForm?.controls;
  }

  get isNoChangeMade() {
    const updatedDisplayName = this.editForm.controls.displayName.value;
    return this.displayName == updatedDisplayName;
  }
}
