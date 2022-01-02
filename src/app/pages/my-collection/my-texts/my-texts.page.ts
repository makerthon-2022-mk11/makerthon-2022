import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RouterService } from 'src/app/services/router.service';
import { ShareTextService } from 'src/app/services/share-text.service';
import { TextService } from 'src/app/services/text.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { TextSelectData } from 'src/app/types/text.types';
import { createSendModal } from 'src/app/utils/send.util';

@Component({
  selector: 'app-my-texts',
  templateUrl: './my-texts.page.html',
  styleUrls: ['./my-texts.page.scss'],
})
export class MyTextsPage implements OnInit {
  isSelectableMode: boolean = false;
  _textDatas: TextSelectData[];

  constructor(
    private modalCtrl: ModalController,
    private routerService: RouterService,
    private shareTextService: ShareTextService,
    private textService: TextService,
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

  get textDatas() {
    if (this.userService.user && !this._textDatas) {
      this.textService.getUniqueOwnTexts().then((texts) => {
        this._textDatas = texts.map((text) => ({ ...text, isSelected: false }));
      });
    }

    return this._textDatas;
  }

  onShare() {
    this.openModal();
  }

  async openModal() {
    const modal = await createSendModal(this.modalCtrl);

    modal.onDidDismiss().then((event) => {
      const recipientIds: string[] = event?.data;
      const textIds = this.textDatas
        .filter((textData) => textData.isSelected)
        .map((textData) => textData.docId);

      if (textIds.length > 0 && recipientIds && recipientIds.length > 0) {
        this.shareTextService
          .shareTextsWithRecipients(textIds, recipientIds)
          .then(() => {
            this.toastService.presentSuccessToast(
              'Successfully shared your texts'
            );
            this.isSelectableMode = false;
          })
          .catch(() => {
            this.toastService.presentErrorToast(
              'There was an error sharing your texts. Please try again later'
            );
          });
      }
    });

    await modal.present();
  }

  onDelete() {
    const textIds = this.textDatas
      .filter((textData) => textData.isSelected)
      .map((textData) => textData.docId);

    if (textIds.length > 0) {
      this.textService
        .deleteMultiple(textIds)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully deleted your texts'
          );
          this.isSelectableMode = false;
          this.reloadData();
        })
        .catch(() => {
          this.toastService.presentErrorToast(
            'There was an error deleting your texts. Please try again later'
          );
        });
    }
  }

  reloadData() {
    this._textDatas = undefined;
  }
}
