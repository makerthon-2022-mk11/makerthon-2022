import { Injectable } from '@angular/core';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class ShareTextService {
  private dbPath = 'shareTexts';

  constructor(private shareService: ShareService) {}

  shareTextWithRecipients(textRef: string, recipientRefs: string[]) {
    return this.shareService.shareItemWithRecipients(
      this.dbPath,
      textRef,
      recipientRefs
    );
  }

  shareTextsWithRecipients(textRefs: string[], recipientRefs: string[]) {
    const promises = textRefs.map((textRef) =>
      this.shareTextWithRecipients(textRef, recipientRefs)
    );
    return Promise.all(promises);
  }

  getRandomOwnTextRef() {
    return this.shareService.getRandomOwnItemRef(this.dbPath);
  }

  getUniqueOwnTextRefs() {
    return this.shareService.getUniqueOwnItemRefs(this.dbPath);
  }

  getUniqueSharedTextRefs() {
    return this.shareService.getUniqueSharedItemRefs(this.dbPath);
  }

  deleteSharedTexts(docRef: string) {
    return this.shareService.deleteSharedItems(this.dbPath, docRef);
  }
}
