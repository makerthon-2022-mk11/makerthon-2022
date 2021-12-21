import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { LinkFormData } from 'src/app/types/link.types';

@Component({
  selector: 'app-upload-link',
  templateUrl: './upload-link.page.html',
  styleUrls: ['./upload-link.page.scss'],
})
export class UploadLinkPage implements OnInit {
  uploadForm: FormGroup;
  isSubmitted: boolean;
  errorMsg: string;
  uploadButtonText: string = 'Upload';

  validations: Validations = {
    link: [{ type: 'required', message: 'Link is required' }],
  };

  constructor(
    private linkService: LinkService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      link: new FormControl('', Validators.required),
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  upload() {
    this.isSubmitted = true;

    if (this.uploadForm.valid) {
      this.errorMsg = '';

      const linkFormData: LinkFormData = {
        link: this.uploadForm.controls.link.value,
        title: this.uploadForm.controls.title.value ?? undefined,
        description: this.uploadForm.controls.description.value ?? undefined,
      };

      this.linkService
        .create(linkFormData)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully uploaded your link'
          );

          this.setDefault();
        })
        .catch(() => {
          this.errorMsg =
            'There was an error uploading your link. Please try again later';
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
