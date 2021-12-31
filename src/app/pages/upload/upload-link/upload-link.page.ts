import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SendComponent } from 'src/app/components/send/send.component';
import { LinkService } from 'src/app/services/link.service';
import { ShareLinkService } from 'src/app/services/share-link.service';
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
  isUploading: boolean;

  validations: Validations = {
    link: [
      { type: 'required', message: 'Link is required' },
      { type: 'pattern', message: 'Empty link is not allowed' },
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    private linkService: LinkService,
    private shareLinkService: ShareLinkService,
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

  onUpload() {
    this.isSubmitted = true;

    if (this.uploadForm.valid) {
      this.errorMsg = '';
      this.isUploading = true;

      this.openModal();
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SendComponent,
      swipeToClose: true,
    });

    modal.onDidDismiss().then(async (event) => {
      const recipientIds: string[] = event?.data;
      if (recipientIds && recipientIds.length > 0) {
        const doc = await this.upload();
        this.shareLinkService
          .shareLinkWithRecipients(doc.id, recipientIds)
          .then(() => {
            this.toastService.presentSuccessToast(
              'Successfully uploaded your link'
            );
            this.setDefault();
          })
          .catch(() => {
            this.errorMsg =
              'There was an error uploading your link. Please try again later';
          })
          .finally(() => {
            this.isUploading = false;
          });
      } else {
        this.isUploading = false;
      }
    });

    await modal.present();
  }

  upload() {
    const link = trimInput(this.controls.link.value);
    const title = trimInput(this.controls.title.value);
    const description = trimInput(this.controls.description.value);

    const linkFormData: LinkFormData = {
      link: link,
      title: isEmpty(title) ? undefined : title,
      description: isEmpty(description) ? undefined : description,
    };

    return this.linkService.create(linkFormData);
  }

  get uploadButtonText() {
    return this.isUploading ? 'Uploading...' : 'Upload';
  }

  private setDefault() {
    this.uploadForm && this.uploadForm.reset();
    this.isSubmitted = false;
  }

  private get controls() {
    return this.uploadForm.controls;
  }
}
