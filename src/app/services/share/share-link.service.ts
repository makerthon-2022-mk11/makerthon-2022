import { Injectable } from '@angular/core';
import {
  ShareLinkFormData,
  ShareLinkPostData,
} from '../../types/share/share-link.types';
import { StoreService } from './../store.service';
import { UserService } from './../user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareLinkService {
  private dbPath = 'shareLinks';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  // create(formData: ShareLinkFormData) {
  //   const postData: ShareLinkPostData = {
  //     ...formData,
  //     senderRef: this.userService.docId,
  //   };

  //   return this.storeService.post(this.dbPath, postData);
  // }
}
