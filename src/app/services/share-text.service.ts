import { Injectable } from '@angular/core';
import { TextData } from '../types/text.types';
import { ShareService } from './share.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ShareTextService {
  private dbPath = 'shareTexts';

  constructor(
    private shareService: ShareService,
    private storeService: StoreService
  ) {}

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
