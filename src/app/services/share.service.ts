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
      .then((snapshot) =>
        snapshot.docs
          .filter((doc) => doc.data().recipientRef != this.userService.docId)
          .map((doc) => doc.data().itemRef)
      );
  }
}
