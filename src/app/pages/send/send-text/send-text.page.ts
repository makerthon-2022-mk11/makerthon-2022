import { Component, OnInit } from '@angular/core';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { FirestoreError } from 'firebase/firestore';
import { firestoreErrorCodeToMessageMap } from 'src/app/constants/store.constants';
import { TextDataFromDb } from 'src/app/types/text.types';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';

@Component({
  selector: 'app-send-text',
  templateUrl: './send-text.page.html',
  styleUrls: ['./send-text.page.scss'],
})
export class SendTextPage implements OnInit {
  emptyListMsg = 'You have yet to send any texts to others';
  loadingMsg = 'Loading...';
  isLoading = false;
  errorMsg: string;

  texts: void | any[] | undefined;
  selectedTexts: Set<String>;
  selectedTextData: Map<String, TextDataFromDb>;

  constructor(
    private shareTextService: ShareTextService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadTexts().then((textDataFromDb) => {
      if (textDataFromDb == null) {
        this.texts = [];
      } else {
        this.texts = textDataFromDb;
      }
      this.selectedTexts = new Set<String>();
      this.selectedTextData = new Map<String, TextDataFromDb>();
      this.isLoading = false;
    });
    this.errorMsg = '';
  }

  async loadTexts() {
    return await this.shareTextService
      .getTextsSentByUser()
      .catch((err: FirestoreError) => {
        this.errorMsg =
          firestoreErrorCodeToMessageMap.get(err.code) ??
          'There is a problem logging in, please try again later';
      });
  }

  onSelect(text: TextDataFromDb) {
    const docRef = text.docRef;

    if (this.selectedTexts.has(docRef)) {
      this.selectedTexts.delete(docRef);
      this.selectedTextData.delete(docRef);
    } else {
      this.selectedTexts.add(docRef);
      this.selectedTextData.set(docRef, text);
    }
  }

  isSelected(text: TextDataFromDb) {
    return this.selectedTexts.has(text.docRef);
  }

  isNothingSelected() {
    return this.selectedTexts == undefined || this.selectedTexts.size == 0;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ShareModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        docRefDataToSend: Array.from(this.selectedTextData.values()),
      },
    });

    await modal.present();
  }
}
