import { Injectable } from '@angular/core';
import {
  ShareTextFormData,
  ShareTextPostData,
} from '../../types/share/share-text.types';
import { StoreService } from './../store.service';
import { UserService } from './../user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareTextService {
  private dbPath = 'shareTexts';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  // create(textFormData: ShareTextFormData) {
  //   const postData: ShareTextPostData = {
  //     ...textFormData,
  //     senderRef: this.userService.docId,
  //   };

  //   return this.storeService.post(this.dbPath, postData);
  // }
}
