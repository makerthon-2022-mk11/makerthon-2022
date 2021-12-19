import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editForm: FormGroup;
  successMsg: string;
  errorMsg: string;
  isSubmitted: boolean;

  validations: Validations = {
    textContent: [{ type: 'required', message: 'Text is required.' }],
  };

  constructor(private textService: TextService) {
    this.editForm = new FormGroup({
      textContent: new FormControl('', Validators.required),
    });

    this.successMsg = '';
    this.errorMsg = '';
    this.isSubmitted = false;
  }

  ngOnInit() {}

  get controls() {
    return this.editForm.controls;
  }
}
