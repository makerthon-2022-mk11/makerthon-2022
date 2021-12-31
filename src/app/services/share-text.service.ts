import { Injectable } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { ShareFormData, SharePostData } from '../types/share.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareTextService {
  private dbPath = 'shareTexts';

  constructor(
    private userService: UserService,
    private storeService: StoreService
  ) {}

  create(shareFormData: ShareFormData) {
    const postData: SharePostData = {
      ...shareFormData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      senderRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  shareTextWithRecipients(textRef: string, recipientRefs: string[]) {
    const promises = recipientRefs.map((recipientRef) =>
      this.create({
        itemRef: textRef,
        recipientRef: recipientRef,
      })
    );

    return Promise.all(promises);
  }
}
