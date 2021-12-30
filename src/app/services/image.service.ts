import { Injectable } from '@angular/core';
import {
  ImageDataFromDb,
  ImagePostData,
  ImageUploadData,
} from '../types/image.types';
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

  getImage(storageRef) {
    return this.storageService.getImage(storageRef);
  }

  async getImageDataByDocRef(docRef: string) {
    const doc = await this.storeService.getDoc(this.dbPath, docRef);

    const imageData = {
      title: doc.data().title,
      description: doc.data().description,
      storageRef: doc.data().storageRef,
      docRef: docRef,
    } as ImageDataFromDb;

    return imageData;
  }
}
