import { Injectable } from '@angular/core';
import { TextPostData } from '../types/text.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

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
      userRef: this.userService.userDocPath,
      content: content,
    };

    return this.storeService.post(this.dbPath, postData);
  }
}
