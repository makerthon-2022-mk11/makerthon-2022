import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadData } from 'src/app/types/storage.types';
import { v4 } from 'uuid';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  previewImg: any = '';
  base64Img = '';
  errorMsg = '';
  successMsg = '';

  galleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
  };

  constructor(
    platform: Platform,
    splashScreen: SplashScreen,
    private camera: Camera,
    private imageService: ImageService
  ) {
    platform.ready().then(() => {
      splashScreen.hide();
    });
    this.previewImg = '../../../assets/images/icon.png';
  }

  ngOnInit() {}

  getImageFromGallery() {
    this.camera
      .getPicture(this.galleryOptions)
      .then((imgData) => {
        this.base64Img = 'data:image/png;base64,' + imgData;
        this.previewImg = this.base64Img;
      })
      .catch((err) => {
        this.errorMsg =
          'There was an error getting your image, please try again later';
      });
  }

  upload() {
    if (this.base64Img) {
      const blob = this.convertBase64ToBlob(this.base64Img);
      const uploadData: UploadData = {
        blob: blob,
        fileName: v4(),
      };
      this.imageService.upload(uploadData).catch((err) => {
        this.errorMsg =
          'There was an error uploading your image, please try again later';
      });
    }
  }

  convertBase64ToBlob(dataURI: string) {
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
}
