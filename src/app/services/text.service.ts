import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { TextData, TextFormData, TextPostData } from '../types/text.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private dbPath = 'texts';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(textFormData: TextFormData) {
    const postData: TextPostData = {
      ...textFormData,
      userRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  async getRandom(): Promise<TextData> {
    const doc = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('userRef', '==', this.userService.docId)
    );

    return doc.data() as TextData;
  }
}
