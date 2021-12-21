import { Injectable } from '@angular/core';
import { ImagePostData, ImageUploadData } from '../types/image.types';
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

  async upload(imageUploadData: ImageUploadData) {
    const uploadData: UploadData = {
      blob: imageUploadData.blob,
      fileName: imageUploadData.fileName,
    };
    const uploadResult = await this.storageService.upload(uploadData);

    const postData: ImagePostData = {
      storageRef: uploadResult.ref.fullPath,
      userRef: this.userService.docId,
      title: imageUploadData.title,
      description: imageUploadData.description,
    };

    return this.create(postData);
  }

  private create(imagePostData: ImagePostData) {
    this.storeService.post(this.dbPath, imagePostData);
  }
}
