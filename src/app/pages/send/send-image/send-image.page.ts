import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareImageService } from 'src/app/services/share/share-image.service';
import { ImageDataFromDb } from 'src/app/types/image.types';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FirestoreError } from 'firebase/firestore';
import { firestoreErrorCodeToMessageMap } from 'src/app/constants/store.constants';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';
import { StoreService } from 'src/app/services/store.service';
import {
  ShareImagePostData,
  ShareImageUploadData,
} from 'src/app/types/share/share-image.types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-image',
  templateUrl: './send-image.page.html',
  styleUrls: ['./send-image.page.scss'],
})
export class SendImagePage implements OnInit {
  emptyListMsg = 'You have yet to send any images to others';
  loadingMsg = 'Loading...';
  isLoading = false;
  errorMsg: string;

  images: void | any[] | undefined;
  selectedImages: Set<String>;
  selectedImageData: Map<String, ImageDataFromDb>;

  constructor(
    private shareImageService: ShareImageService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadImages().then((imageDataFromDb) => {
      if (imageDataFromDb == null) {
        this.images = [];
      } else {
        this.images = imageDataFromDb;
      }
      this.selectedImages = new Set<String>();
      this.selectedImageData = new Map<String, ImageDataFromDb>();
      this.isLoading = false;
    });
    this.errorMsg = '';
  }

  async loadImages() {
    return await this.shareImageService
      .getImagesSentByUser()
      .catch((err: FirestoreError) => {
        this.errorMsg =
          firestoreErrorCodeToMessageMap.get(err.code) ??
          'There is a problem logging in, please try again later';
      });
  }

  onSelect(image: ImageDataFromDb) {
    const docRef = image.docRef;

    if (this.selectedImages.has(docRef)) {
      this.selectedImages.delete(docRef);
      this.selectedImageData.delete(docRef);
    } else {
      this.selectedImages.add(docRef);
      this.selectedImageData.set(docRef, image);
    }
  }

  isSelected(image: ImageDataFromDb) {
    return this.selectedImages.has(image.docRef);
  }

  isNothingSelected() {
    return this.selectedImages == undefined || this.selectedImages.size == 0;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ShareModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        docRefDataToSend: Array.from(this.selectedImageData.values()),
      },
    });

    await modal.present();
  }
}
