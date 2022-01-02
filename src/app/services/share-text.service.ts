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

  getUniqueSharedTextRefs() {
    return this.shareService.getUniqueSharedItemRefs(this.dbPath);
  }

  deleteSharedTexts(docRef: string) {
    return this.shareService.deleteSharedItems(this.dbPath, docRef);
  }
}
