import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { RouterService } from 'src/app/services/router.service';
import { ShareImageService } from 'src/app/services/share-image.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { ImageDeleteData, ImageSelectData } from 'src/app/types/image.types';
import {
  createDefaultSendModal,
  createMyCollectionSendModal,
} from 'src/app/utils/send.util';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.page.html',
  styleUrls: ['./my-images.page.scss'],
})
export class MyImagesPage implements OnInit {
  isSelectableMode: boolean = false;
  hasLoaded: boolean = false;
  _imageDatas: ImageSelectData[];

  constructor(
    private imageService: ImageService,
    private modalCtrl: ModalController,
    private routerService: RouterService,
    private shareImageService: ShareImageService,
    private toastService: ToastService,
    private userService: UserService
  ) {
    this.routerService.getReloadMyCollectionSubject().subscribe((isReload) => {
      if (isReload) {
        this.reloadData();
      }
    });
  }

  ngOnInit() {}

  get imageDatas() {
    if (this.userService.user && !this.hasLoaded) {
      this.hasLoaded = true;
      this.imageService.getUniqueOwnImages().then((images) => {
        this._imageDatas = images.map((image) => ({
          ...image,
          isSelected: false,
        }));
      });
    }

    return this._imageDatas;
  }

  onShare() {
    this.openModal();
  }

  async openModal() {
    const modal = await createMyCollectionSendModal(this.modalCtrl);

    modal.onDidDismiss().then((event) => {
      const recipientIds: string[] = event?.data;
      const imageIds = this.imageDatas
        .filter((imageData) => imageData.isSelected)
        .map((imageData) => imageData.docId);

      if (imageIds.length > 0 && recipientIds && recipientIds.length > 0) {
        this.shareImageService
          .shareImagesWithRecipients(imageIds, recipientIds)
          .then(() => {
            this.toastService.presentSuccessToast(
              'Successfully shared your images'
            );
            this.isSelectableMode = false;
          })
          .catch(() => {
            this.toastService.presentErrorToast(
              'There was an error sharing your images. Please try again later'
            );
          });
      }
    });

    await modal.present();
  }

  onDelete() {
    const imageDeleteDatas: ImageDeleteData[] = this.imageDatas
      .filter((imageData) => imageData.isSelected)
      .map((imageData) => ({
        storageRef: imageData.storageRef,
        docId: imageData.docId,
      }));

    if (imageDeleteDatas.length > 0) {
      this.imageService
        .deleteMultiple(imageDeleteDatas)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully deleted your images'
          );
          this.isSelectableMode = false;
          this.reloadData();
        })
        .catch(() => {
          this.toastService.presentErrorToast(
            'There was an error deleting your images. Please try again later'
          );
        });
    }
  }

  reloadData() {
    this.hasLoaded = false;
  }
}
