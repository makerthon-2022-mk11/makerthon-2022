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
}
