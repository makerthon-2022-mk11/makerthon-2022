import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LinkService } from 'src/app/services/link.service';
import { RouterService } from 'src/app/services/router.service';
import { ShareLinkService } from 'src/app/services/share-link.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { LinkSelectData } from 'src/app/types/link.types';
import { createDefaultSendModal } from 'src/app/utils/send.util';

@Component({
  selector: 'app-shared-links',
  templateUrl: './shared-links.page.html',
  styleUrls: ['./shared-links.page.scss'],
})
export class SharedLinksPage implements OnInit {
  isSelectableMode: boolean = false;
  hasLoaded: boolean = false;
  _linkDatas: LinkSelectData[];

  constructor(
    private linkService: LinkService,
    private modalCtrl: ModalController,
    private routerService: RouterService,
    private shareLinkService: ShareLinkService,
    private toastService: ToastService,
    private userService: UserService
  ) {
    this.routerService
      .getReloadSharedCollectionSubject()
      .subscribe((isReload) => {
        if (isReload) {
          this.reloadData();
        }
      });
  }

  ngOnInit() {}

  get linkDatas() {
    if (this.userService.user && !this.hasLoaded) {
      this.hasLoaded = true;
      this.linkService.getUniqueSharedLinks().then((links) => {
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
    const modal = await createDefaultSendModal(this.modalCtrl);

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

  onDelete() {
    const linkIds = this.linkDatas
      .filter((linkData) => linkData.isSelected)
      .map((linkData) => linkData.docId);

    if (linkIds.length > 0) {
      this.linkService
        .deleteMultiple(linkIds)
        .then(() => {
          this.toastService.presentSuccessToast(
            'Successfully deleted your links'
          );
          this.isSelectableMode = false;
          this.reloadData();
        })
        .catch(() => {
          this.toastService.presentErrorToast(
            'There was an error deleting your links. Please try again later'
          );
        });
    }
  }

  reloadData() {
    this.hasLoaded = false;
  }
}
