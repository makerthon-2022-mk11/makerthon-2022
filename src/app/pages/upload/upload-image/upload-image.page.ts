import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController, Platform } from '@ionic/angular';
import { ERR_NO_IMAGE_SELECTED } from 'src/app/constants/upload.contants';
import { ImageService } from 'src/app/services/image.service';
import { ShareImageService } from 'src/app/services/share-image.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImageUploadData } from 'src/app/types/image.types';
import {
  getUploadButtonText,
  isEmpty,
  trimInput,
} from 'src/app/utils/form.util';
import { createSendModal } from 'src/app/utils/send.util';
import { v4 } from 'uuid';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  previewImgUrl: string;
  base64ImgUrl: string;
  errorMsg: string;
  isUploading: boolean;
  uploadForm: FormGroup;

  galleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
  };

  constructor(
    platform: Platform,
    splashScreen: SplashScreen,
    private camera: Camera,
    private imageService: ImageService,
    private modalCtrl: ModalController,
    private shareImageService: ShareImageService,
    private toastService: ToastService
  ) {
    platform.ready().then(() => {
      splashScreen.hide();
    });

    this.setDefault();
  }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  getImageFromGallery() {
    this.errorMsg = '';

    this.camera
      .getPicture(this.galleryOptions)
      .then((imgData) => {
        this.base64ImgUrl = 'data:image/png;base64,' + imgData;
        this.previewImgUrl = this.base64ImgUrl;
      })
      .catch((err) => {
        if (err !== ERR_NO_IMAGE_SELECTED) {
          this.errorMsg =
            'There was an error getting your image, please try again later';
        }
      });
  }

  hasSelectedImage() {
    return this.base64ImgUrl;
  }

  onUpload() {
    if (this.hasSelectedImage()) {
      this.errorMsg = '';
      this.isUploading = true;

      this.openModal();
    }
  }

  async openModal() {
    const modal = await createSendModal(this.modalCtrl);

    modal.onDidDismiss().then(async (event) => {
      const recipientIds: string[] = event?.data;
      if (recipientIds && recipientIds.length > 0) {
        const doc = await this.upload();
        this.shareImageService
          .shareImageWithRecipients(doc.id, recipientIds)
          .then(() => {
            this.toastService.presentSuccessToast(
              'Successfully uploaded your image'
            );
            this.setDefault();
          })
          .catch(() => {
            this.errorMsg =
              'There was an error uploading your image. Please try again later';
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
    const blob = this.convertBase64ToBlob(this.base64ImgUrl);
    const title = trimInput(this.controls.title.value);
    const description = trimInput(this.controls.description.value);

    const uploadData: ImageUploadData = {
      blob: blob,
      fileName: v4(),
      title: isEmpty(title) ? undefined : title,
      description: isEmpty(description) ? undefined : description,
    };
    return this.imageService.upload(uploadData);
  }

  private convertBase64ToBlob(dataURI: string) {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  get uploadButtonText() {
    return getUploadButtonText(this.isUploading);
  }

  private setDefault() {
    this.base64ImgUrl = '';
    this.previewImgUrl = '../../../../assets/images/upload-image.png';
    this.uploadForm && this.uploadForm.reset();
  }

  private get controls() {
    return this.uploadForm.controls;
  }
}
