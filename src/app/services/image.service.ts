import { Injectable } from '@angular/core';
import { ImagePostData } from '../types/image.types';
import { UploadData } from '../types/storage.types';
import { StorageService } from './storage.service';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  dbPath = 'images';

  constructor(
    private storageService: StorageService,
    private storeService: StoreService,
    private userService: UserService
  ) {}

  async upload(uploadData: UploadData) {
    const uploadResult = await this.storageService.upload(uploadData);

    const postData: ImagePostData = {
      storageRef: uploadResult.ref.fullPath,
      userRef: this.userService.docId,
    };

    return this.create(postData);
  }

  private create(imagePostData: ImagePostData) {
    this.storeService.post(this.dbPath, imagePostData);
  }
}
