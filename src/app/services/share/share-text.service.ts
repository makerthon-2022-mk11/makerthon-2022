import { Injectable } from '@angular/core';
import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import { ShareTextPostData } from '../../types/share/share-text.types';
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
        const uniqueTextDocs = this.getUniqueTextDocs(snapshot);
        let promises = this.getTextDataWithDocId(uniqueTextDocs);
        const result = await Promise.all(promises);
        return result;
      });
  }

  private getUniqueTextDocs(snapshotDocs: QuerySnapshot<DocumentData>) {
    let unique = new Map<String, Date>();

    snapshotDocs.forEach((doc) => {
      const docRef = doc.data().docRef;
      const date = (doc.data().createdAt as Timestamp).toDate();

      if (unique.has(docRef)) {
        if (unique[docRef] < date) {
          unique.set(docRef, date);
        }
      } else {
        unique.set(docRef, date);
      }
    });

    return Array.from(unique).sort((a, b) => {
      return a.values[1] - b.values[1];
    });
  }

  private getTextDataWithDocId(uniqueTextDocs: [String, any][]) {
    let promises = [];

    uniqueTextDocs.forEach((doc) => {
      const docRef = doc[0] as string;
      const promise = this.textService.getTextDataByDocRef(doc[0] as string);
      promises.push(promise);
    });

    return promises;
  }

  getTextsSentToUser() {}
}
