import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { LinkData, LinkFormData, LinkPostData } from '../types/link.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = 'links';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(formData: LinkFormData) {
    const postData: LinkPostData = {
      ...formData,
      userRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  async getRandom(): Promise<LinkData> {
    const doc = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('userRef', '==', this.userService.docId)
    );

    return doc.data() as LinkData;
  }
}
