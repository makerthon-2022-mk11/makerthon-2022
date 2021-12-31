import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SendComponent } from 'src/app/components/send/send.component';
import { TextService } from 'src/app/services/text.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { TextFormData } from 'src/app/types/text.types';
import { isEmpty, trimInput } from 'src/app/utils/form.util';

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
    text: [
      { type: 'required', message: 'Text is required' },
      { type: 'pattern', message: 'Empty text is not allowed' },
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    private textService: TextService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      text: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ]),
      title: new FormControl(undefined),
      description: new FormControl(undefined),
    });
  }

  onUpload() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SendComponent,
      swipeToClose: true,
    });

    await modal.present();
  }

  upload() {
    this.isSubmitted = true;

    if (this.uploadForm.valid) {
      this.errorMsg = '';
      this.isUploading = true;

      const text = trimInput(this.controls.text.value);
      const title = trimInput(this.controls.title.value);
      const description = trimInput(this.controls.description.value);

      const textFormData: TextFormData = {
        text: text,
        title: isEmpty(title) ? undefined : title,
        description: isEmpty(description) ? undefined : description,
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

  private get controls() {
    return this.uploadForm.controls;
  }
}
