import { Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import {
  ShareImagePostData,
  ShareImageUploadData,
} from '../../types/share/share-image.types';
import { UploadData } from '../../types/storage.types';
import { StorageService } from './../storage.service';
import { StoreService } from './../store.service';
import { UserService } from './../user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareImageService {
  dbPath = 'shareImages';

  constructor(
    private storageService: StorageService,
    private storeService: StoreService,
    private userService: UserService
  ) {}

  async share(shareImageUploadData: ShareImageUploadData) {
    const uploadData: UploadData = {
      blob: shareImageUploadData.blob,
      fileName: shareImageUploadData.fileName,
    };
    const uploadResult = await this.storageService.upload(uploadData);

    const postData: ShareImagePostData = {
      storageRef: uploadResult.ref.fullPath,
      title: shareImageUploadData.title,
      description: shareImageUploadData.description,
      senderRef: this.userService.docId,
      recipientRef: shareImageUploadData.recipientRef,
    };

    return this.create(postData);
  }

  private create(shareImagePostData: ShareImagePostData) {
    this.storeService.post(this.dbPath, shareImagePostData);
  }

  // async loadImagesByUser(): List[Image] {
  //   const snapshots = await this.storeService
  //   .getSnapshotChanges(this.dbPath, () => where('senderRef', "==", this.userService.user.uid))
  //   .then((snapshot) => {
  //     if (snapshot.size > 0) {
  //       let images = [];
  //       snapshot.forEach(doc => {
  //         let image = doc.data() as Image;
  //         images.push(image);
  //       });
  //       return images;
  //     }
  //     return [];
  //   });
  // }
}
