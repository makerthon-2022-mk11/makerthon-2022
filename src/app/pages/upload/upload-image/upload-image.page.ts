import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from '@ionic/angular';
import { ERR_NO_IMAGE_SELECTED } from 'src/app/constants/upload.contants';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImageUploadData } from 'src/app/types/image.types';
import { UploadData } from 'src/app/types/storage.types';
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
  uploadButtonText: string = 'Upload';
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

  upload() {
    if (this.hasSelectedImage()) {
      this.isUploading = true;
      this.uploadButtonText = 'Uploading...';
      this.errorMsg = '';

      const blob = this.convertBase64ToBlob(this.base64ImgUrl);
      const uploadData: ImageUploadData = {
        blob: blob,
        fileName: v4(),
        title: this.uploadForm.controls.title.value,
        description: this.uploadForm.controls.description.value,
      };
      this.imageService
        .upload(uploadData)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully uploaded your image!'
          );
          this.setDefault();
        })
        .catch(() => {
          this.errorMsg =
            'There was an error uploading your image, please try again later';
        })
        .finally(() => {
          this.isUploading = false;
          this.uploadButtonText = 'Upload';
        });
    }
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

  private setDefault() {
    this.base64ImgUrl = '';
    this.previewImgUrl = '../../../../assets/images/upload-image.png';
    this.uploadForm && this.uploadForm.reset();
  }
}
