import { Injectable } from '@angular/core';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class ShareImageService {
  private dbPath = 'shareImages';

  constructor(private shareService: ShareService) {}

  shareImageWithRecipients(imageRef: string, recipientRefs: string[]) {
    return this.shareService.shareItemWithRecipients(
      this.dbPath,
      imageRef,
      recipientRefs
    );
  }

  shareImagesWithRecipients(imageRefs: string[], recipientRefs: string[]) {
    const promises = imageRefs.map((imageRef) =>
      this.shareImageWithRecipients(imageRef, recipientRefs)
    );
    return Promise.all(promises);
  }

  getRandomOwnImageRef() {
    return this.shareService.getRandomOwnItemRef(this.dbPath);
  }

  getUniqueOwnImageRefs() {
    return this.shareService.getUniqueOwnItemRefs(this.dbPath);
  }

  getUniqueSharedImageRefs() {
    return this.shareService.getUniqueSharedItemRefs(this.dbPath);
  }

  deleteSharedImages(docRef: string) {
    return this.shareService.deleteSharedItems(this.dbPath, docRef);
  }
}
