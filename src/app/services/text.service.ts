import { Injectable } from '@angular/core';
import { TextPostData } from '../types/text.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';
import { where } from "firebase/firestore";  

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private dbPath = '/texts';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(content: string) {
    const postData: TextPostData = {
      userRef: this.userService.docId,
      content: content,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  private async getText(uid: string) {
    const snapshot = await this.storeService.getSnapshotChanges(
      this.dbPath, 
      () => where('userRef', '==', uid)
    );
  }
}
