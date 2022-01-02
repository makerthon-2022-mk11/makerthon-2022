import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LinkService } from 'src/app/services/link.service';
import { ShareLinkService } from 'src/app/services/share-link.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { LinkSelectData } from 'src/app/types/link.types';
import { createSendModal } from 'src/app/utils/send.util';

@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.page.html',
  styleUrls: ['./my-links.page.scss'],
})
export class MyLinksPage implements OnInit {
  isSelectableMode: boolean = false;
  _linkDatas: LinkSelectData[];

  constructor(
    private modalCtrl: ModalController,
    private linkService: LinkService,
    private shareLinkService: ShareLinkService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  get linkDatas() {
    if (this.userService.user && !this._linkDatas) {
      this.linkService.getUniqueOwnLinks().then((links) => {
        this._linkDatas = links.map((link) => ({
          ...link,
          isSelected: false,
        }));
      });
    }
    return this._linkDatas;
  }

  onShare() {
    this.openModal();
  }

  async openModal() {
    const modal = await createSendModal(this.modalCtrl);

    modal.onDidDismiss().then((event) => {
      const recipientIds: string[] = event?.data;
      const linkIds = this.linkDatas
        .filter((linkData) => linkData.isSelected)
        .map((linkData) => linkData.docId);

      if (linkIds.length > 0 && recipientIds && recipientIds.length > 0) {
        this.shareLinkService
          .shareLinksWithRecipients(linkIds, recipientIds)
          .then(() => {
            this.toastService.presentSuccessToast(
              'Successfully shared your links'
            );
            this.isSelectableMode = false;
          })
          .catch(() => {
            this.toastService.presentErrorToast(
              'There was an error sharing your links. Please try again later'
            );
          });
      }
    });

    await modal.present();
  }
}
