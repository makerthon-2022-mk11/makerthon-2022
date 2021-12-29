import { Injectable } from '@angular/core';
import {
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import {
  ShareTextFormData,
  ShareTextPostData,
} from '../../types/share/share-text.types';
import { StoreService } from './../store.service';
import { UserService } from './../user.service';
import { TextService } from './../text.service';

@Injectable({
  providedIn: 'root',
})
export class ShareTextService {
  private dbPath = 'shareTexts';

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private textService: TextService
  ) {}

  // create(shareTextFormData: ShareTextFormData) {
  //   const postData: ShareTextPostData = shareTextFormData & {
  //     senderRef: this.userService.docId,
  //   };

  //   return this.storeService.post(this.dbPath, postData);
  // }

  // TEMP
  create(recipientRef: string, docRef: string) {
    const postData: ShareTextPostData = {
      recipientRef: recipientRef,
      docRef: docRef,
      senderRef: this.userService.docId,
    };
    return this.storeService.post(this.dbPath, postData);
  }

  getTextsSentByUser() {
    return this.storeService
      .getSnapshotChanges(this.dbPath, () =>
        where('senderRef', '==', this.userService.docId)
      )
      .then(async (snapshot) => {
        let promises = this.getTextDataWithDocId(snapshot);
        const result = await Promise.all(promises);
        return [...new Set(result)];
      })
      .catch((err: FirestoreError) => {
        console.log(err.code);
      });
  }

  private getTextDataWithDocId(snapshotDocs: QuerySnapshot<DocumentData>) {
    let promises = [];

    snapshotDocs.forEach((doc) => {
      const promise = this.textService.getTextDataByDocRef(doc.data().docRef);
      promises.push(promise);
    });

    return promises;
  }

  getTextsSentToUser() {}
}
