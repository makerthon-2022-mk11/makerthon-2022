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
  selector: 'app-shared-texts',
  templateUrl: './shared-texts.page.html',
  styleUrls: ['./shared-texts.page.scss'],
})
export class SharedTextsPage implements OnInit {
  isSelectableMode: boolean = false;
  _textDatas: TextSelectData[];

  constructor(
    private modalCtrl: ModalController,
    private shareTextService: ShareTextService,
    private textService: TextService,
    private toastService: ToastService,
    private userService: UserService,
    private routerService: RouterService
  ) {
    this.routerService.getReloadSubject().subscribe((isReload) => {
      if (isReload) {
        this._textDatas = undefined;
      }
    });
  }

  ngOnInit() {}

  hasTitle(textData: TextSelectData) {
    return textData.title;
  }

  enterSelectMode() {
    this.isSelectableMode = true;
  }

  exitSelectMode() {
    this.isSelectableMode = false;
  }

  toggleItemIsSelected(textData: TextSelectData) {
    textData.isSelected = !textData.isSelected;
  }

  get textDatas() {
    if (this.userService.user && !this._textDatas) {
      this.textService.getUniqueSharedTexts().then((texts) => {
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
          })
          .catch(() => {
            this.toastService.presentSuccessToast(
              'There was an error sharing your texts. Please try again later'
            );
          });
      }
    });

    await modal.present();
  }
}
