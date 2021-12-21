import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from '@ionic/angular';
import { ERR_NO_IMAGE_SELECTED } from 'src/app/constants/upload.contants';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
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
  uploadButtonValue: string = 'Upload';

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

  ngOnInit() {}

  getImageFromGallery() {
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
      this.uploadButtonValue = 'Uploading...';

      const blob = this.convertBase64ToBlob(this.base64ImgUrl);
      const uploadData: UploadData = {
        blob: blob,
        fileName: v4(),
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
          this.uploadButtonValue = 'Upload';
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
  }
}
