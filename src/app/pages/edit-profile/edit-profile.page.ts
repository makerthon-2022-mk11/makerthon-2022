import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { authErrorCodeToMessageMap } from 'src/app/constants/auth.constants';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editForm: FormGroup;
  errorMsg: string;
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.editForm = new FormGroup({
        displayName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-z0-9_]+$'),
        ]),
      });

      this.errorMsg = '';
      this.isSubmitted = false;
    });
  }

  editProfile() {
    const updatedDisplayName = this.editForm.controls.displayName.value;
  }

  navToProfile() {
    this.router.navigateByUrl(routePaths.PROFILE);
  }

  get controls() {
    return this.editForm.controls;
  }
}
