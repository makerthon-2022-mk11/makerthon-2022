import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import {
  TextData,
  TextFormData,
  TextPostData,
  TextDataFromDb,
} from '../types/text.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private dbPath = 'texts';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(textFormData: TextFormData) {
    const postData: TextPostData = {
      ...textFormData,
      userRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  getTextsDataByUser() {
    let texts = [];
    const snapshot = this.storeService
      .getSnapshotChanges(this.dbPath, () =>
        where('userRef', '==', this.userService.docId)
      )
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          delete data.userRef;

          texts.push(data);
        });
      });

    return texts;
  }

  async getTextDataByDocRef(docRef: string) {
    const doc = await this.storeService.getDoc(this.dbPath, docRef);

    const textData = {
      title: doc.data().title,
      description: doc.data().description,
      text: doc.data().text,
      docRef: docRef,
    } as TextDataFromDb;

    return textData;
  }

  async getRandom(): Promise<TextData> {
    const doc = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('userRef', '==', this.userService.docId)
    );

    return doc.data() as TextData;
  }
}
