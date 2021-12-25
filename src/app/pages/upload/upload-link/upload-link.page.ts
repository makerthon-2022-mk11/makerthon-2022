import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { LinkFormData } from 'src/app/types/link.types';
import { isEmpty, trimInput } from 'src/app/utils/form.util';

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
    link: [
      { type: 'required', message: 'Link is required' },
      { type: 'pattern', message: 'Empty link is not allowed' },
    ],
  };

  constructor(
    private linkService: LinkService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      link: new FormControl('', [
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ]),
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  upload() {
    this.isSubmitted = true;

    if (this.uploadForm.valid) {
      this.errorMsg = '';

      const link = trimInput(this.controls.link.value);
      const title = trimInput(this.controls.title.value);
      const description = trimInput(this.controls.description.value);

      const linkFormData: LinkFormData = {
        link: link,
        title: isEmpty(title) ? undefined : title,
        description: isEmpty(description) ? undefined : description,
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

  private get controls() {
    return this.uploadForm.controls;
  }
}
