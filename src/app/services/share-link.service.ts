import { Injectable } from '@angular/core';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class ShareLinkService {
  private dbPath = 'shareLinks';

  constructor(private shareService: ShareService) {}

  shareLinkWithRecipients(linkRef: string, recipientRefs: string[]) {
    return this.shareService.shareItemWithRecipients(
      this.dbPath,
      linkRef,
      recipientRefs
    );
  }

  shareLinksWithRecipients(linkRefs: string[], recipientRefs: string[]) {
    const promises = linkRefs.map((linkRef) =>
      this.shareLinkWithRecipients(linkRef, recipientRefs)
    );
    return Promise.all(promises);
  }

  getUniqueSharedLinkRefs() {
    return this.shareService.getUniqueSharedItemRefs(this.dbPath);
  }

  deleteSharedLinkWithDocRef(docRef: string) {
    return this.shareService.deleteItemsWithDocRef(this.dbPath, docRef);
  }

  deleteSharedLinksWithDocRef(docRefs: string[]) {
    const promises = docRefs.map((docRef) => {
      this.deleteSharedLinkWithDocRef(docRef);
    });
    return Promise.all(promises);
  }
}
