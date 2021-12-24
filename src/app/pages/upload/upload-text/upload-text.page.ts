import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { TextFormData } from 'src/app/types/text.types';

@Component({
  selector: 'app-upload-text',
  templateUrl: './upload-text.page.html',
  styleUrls: ['./upload-text.page.scss'],
})
export class UploadTextPage implements OnInit {
  uploadForm: FormGroup;
  isSubmitted: boolean;
  errorMsg: string;
  uploadButtonText: string = 'Upload';
  isUploading: boolean;

  validations: Validations = {
    text: [{ type: 'required', message: 'Text is required' }],
  };

  constructor(
    private textService: TextService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      text: new FormControl('', Validators.required),
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  upload() {
    this.isSubmitted = true;

    if (this.uploadForm.valid) {
      this.errorMsg = '';
      this.isUploading = true;

      const textFormData: TextFormData = {
        text: this.uploadForm.controls.text.value,
        title: this.uploadForm.controls.title.value,
        description: this.uploadForm.controls.description.value,
      };

      this.textService
        .create(textFormData)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully uploaded your text'
          );

          this.setDefault();
        })
        .catch(() => {
          this.errorMsg =
            'There was an error uploading your text. Please try again later';
        })
        .finally(() => {
          this.isUploading = false;
        });
    }
  }

  private setDefault() {
    this.uploadForm && this.uploadForm.reset();
    this.isSubmitted = false;
  }

  get controls() {
    return this.uploadForm.controls;
  }
}
