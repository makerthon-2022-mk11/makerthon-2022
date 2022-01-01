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

  getUniqueSharedTextRefs() {
    return this.shareService.getUniqueSharedItemRefs(this.dbPath);
  }
}
