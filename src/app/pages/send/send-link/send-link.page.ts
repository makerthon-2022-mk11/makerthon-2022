import { Component, OnInit } from '@angular/core';
import { ShareLinkService } from 'src/app/services/share/share-link.service';
import { LinkDataFromDb, LinkFormData } from 'src/app/types/link.types';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FirestoreError } from 'firebase/firestore';
import { firestoreErrorCodeToMessageMap } from 'src/app/constants/store.constants';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';

@Component({
  selector: 'app-send-link',
  templateUrl: './send-link.page.html',
  styleUrls: ['./send-link.page.scss'],
})
export class SendLinkPage implements OnInit {
  emptyListMsg = 'You have yet to send any links to others';
  loadingMsg = 'Loading...';
  isLoading = false;
  errorMsg: string;

  links: void | any[] | undefined;
  selectedLinks: Set<String>;
  selectedLinkData: Map<String, LinkDataFromDb>;

  constructor(
    private shareLinkService: ShareLinkService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadLinks().then((linkDataFromDb) => {
      if (linkDataFromDb == null) {
        this.links = [];
      } else {
        this.links = linkDataFromDb;
      }
      this.selectedLinks = new Set<String>();
      this.selectedLinkData = new Map<String, LinkDataFromDb>();
      this.isLoading = false;
    });
    this.errorMsg = '';
  }

  async loadLinks() {
    return await this.shareLinkService
      .getLinksSentByUser()
      .catch((err: FirestoreError) => {
        this.errorMsg =
          firestoreErrorCodeToMessageMap.get(err.code) ??
          'There is a problem logging in, please try again later';
      });
  }

  onSelect(link: LinkDataFromDb) {
    const docRef = link.docRef;

    if (this.selectedLinks.has(docRef)) {
      this.selectedLinks.delete(docRef);
      this.selectedLinkData.delete(docRef);
    } else {
      this.selectedLinks.add(docRef);
      this.selectedLinkData.set(docRef, link);
    }
  }

  isSelected(link: LinkDataFromDb) {
    return this.selectedLinks.has(link.docRef);
  }

  isNothingSelected() {
    return this.selectedLinks == undefined || this.selectedLinks.size == 0;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ShareModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        docRefDataToSend: Array.from(this.selectedLinkData.values()),
      },
    });

    await modal.present();
  }
}
