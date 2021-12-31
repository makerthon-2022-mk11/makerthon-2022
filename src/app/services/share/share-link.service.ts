import { Injectable } from '@angular/core';
import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import {
  ShareLinkFormData,
  ShareLinkPostData,
} from '../../types/share/share-link.types';
import { LinkService } from '../link.service';
import { StoreService } from './../store.service';
import { UserService } from './../user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareLinkService {
  private dbPath = 'shareLinks';

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private linkService: LinkService
  ) {}

  create(shareLinkFormData: ShareLinkFormData) {
    const postData: ShareLinkPostData = {
      ...shareLinkFormData,
      senderRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  getLinksSentByUser() {
    return this.storeService
      .getSnapshotChanges(this.dbPath, () =>
        where('senderRef', '==', this.userService.docId)
      )
      .then(async (snapshot) => {
        const uniqueLinkDocs = this.getUniqueLinkDocs(snapshot);
        let promises = this.getLinkDataWithDocId(uniqueLinkDocs);
        const result = await Promise.all(promises);
        return result;
      });
  }

  private getUniqueLinkDocs(snapshotDocs: QuerySnapshot<DocumentData>) {
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

  private getLinkDataWithDocId(uniqueLinkDocs: [String, any][]) {
    let promises = [];

    uniqueLinkDocs.forEach((doc) => {
      const docRef = doc[0] as string;
      const promise = this.linkService.getLinkDataByDocRef(doc[0] as string);
      promises.push(promise);
    });

    return promises;
  }
}
