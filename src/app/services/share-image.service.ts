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
}
