import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  uploadForm: FormGroup;
  successMsg: string;
  errorMsg: string;
  isSubmitted: boolean;

  validations: Validations = {
    textContent: [{ type: 'required', message: 'Text is required.' }],
  };

  constructor(private textService: TextService) {
    this.uploadForm = new FormGroup({
      textContent: new FormControl('', Validators.required),
    });

    this.successMsg = '';
    this.errorMsg = '';
    this.isSubmitted = false;
  }

  ngOnInit() {}

  submit() {
    this.isSubmitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    const content: string = this.uploadForm.controls.textContent.value;
    if (this.uploadForm.valid) {
      this.textService
        .create(content.trim())
        .then(() => {
          this.successMsg = `Successfully added your moment, [${
            content.length > 10 ? content.substring(0, 10) + '...' : content
          }]!`;
          this.isSubmitted = false;
          this.uploadForm.reset();
        })
        .catch(() => {
          this.errorMsg =
            'There was an error during submission, try again later.';
        });
    }
  }

  get controls() {
    return this.uploadForm.controls;
  }
}
