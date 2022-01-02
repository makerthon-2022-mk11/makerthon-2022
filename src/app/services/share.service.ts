import { Injectable } from '@angular/core';
import { doc, serverTimestamp, where } from '@angular/fire/firestore';
import { ShareFormData, SharePostData } from '../types/share.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private userService: UserService,
    private storeService: StoreService
  ) {}

  create(dbPath: string, shareFormData: ShareFormData) {
    const postData: SharePostData = {
      ...shareFormData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      senderRef: this.userService.docId,
    };

    return this.storeService.post(dbPath, postData);
  }

  shareItemWithRecipients(
    dbPath: string,
    itemRef: string,
    recipientRefs: string[]
  ) {
    const promises = recipientRefs.map((recipientRef) =>
      this.create(dbPath, {
        itemRef: itemRef,
        recipientRef: recipientRef,
      })
    );

    return Promise.all(promises);
  }

  getUniqueOwnItemRefs(dbPath: string) {
    return this.getOwnItemRefs(dbPath).then((docIds) => [...new Set(docIds)]);
  }

  private getOwnItemRefs(dbPath: string) {
    return this.storeService
      .getSnapshotChanges(dbPath, () =>
        where('recipientRef', '==', this.userService.docId)
      )
      .then((snapshot) => {
        const docs = snapshot.docs;

        docs.sort(
          (firstDoc, secondDoc) =>
            secondDoc.data().createdAt.seconds -
            firstDoc.data().createdAt.seconds
        );

        return docs.map((doc) => doc.data().itemRef);
      });
  }

  getUniqueSharedItemRefs(dbPath: string) {
    return this.getSharedItemRefs(dbPath).then((docIds) => [
      ...new Set(docIds),
    ]);
  }

  private getSharedItemRefs(dbPath: string) {
    return this.storeService
      .getSnapshotChanges(dbPath, () =>
        where('senderRef', '==', this.userService.docId)
      )
      .then((snapshot) => {
        const docs = snapshot.docs.filter(
          (doc) => doc.data().recipientRef != this.userService.docId
        );

        docs.sort(
          (firstDoc, secondDoc) =>
            secondDoc.data().createdAt.seconds -
            firstDoc.data().createdAt.seconds
        );

        return docs.map((doc) => doc.data().itemRef);
      });
  }
}
