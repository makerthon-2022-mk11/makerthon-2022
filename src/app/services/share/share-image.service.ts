import { Injectable } from '@angular/core';
import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import {
  ShareImagePostData,
  ShareImageUploadData,
} from '../../types/share/share-image.types';
import { UploadData } from '../../types/storage.types';
import { ImageService } from '../image.service';
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
    private userService: UserService,
    private imageService: ImageService
  ) {}

  // async share(shareImageUploadData: ShareImageUploadData) {
  //   const uploadData: UploadData = {
  //     blob: shareImageUploadData.blob,
  //     fileName: shareImageUploadData.fileName,
  //   };
  //   const uploadResult = await this.storageService.upload(uploadData);

  //   const postData: ShareImagePostData = {
  //     storageRef: uploadResult.ref.fullPath,
  //     title: shareImageUploadData.title,
  //     description: shareImageUploadData.description,
  //     senderRef: this.userService.docId,
  //     recipientRef: shareImageUploadData.recipientRef,
  //   };

  //   return this.create(postData);
  // }
  // private create(shareImagePostData: ShareImagePostData) {
  //   this.storeService.post(this.dbPath, shareImagePostData);
  // }

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

  create(shareImageUploadData: ShareImageUploadData) {
    const postData: ShareImagePostData = {
      ...shareImageUploadData,
      senderRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  getImagesSentByUser() {
    return this.storeService
      .getSnapshotChanges(this.dbPath, () =>
        where('senderRef', '==', this.userService.docId)
      )
      .then(async (snapshot) => {
        const uniqueImageDocs = this.getUniqueImageDocs(snapshot);
        let promises = this.getImageDataWithDocId(uniqueImageDocs);
        const result = await Promise.all(promises);
        return result;
      });
  }

  private getUniqueImageDocs(snapshotDocs: QuerySnapshot<DocumentData>) {
    let unique = new Map<String, Date>();

    snapshotDocs.forEach((doc) => {
      const docRef = doc.data().docRef;
      const date = (doc.data().createdAt as Timestamp).toDate();

      if (unique.has(docRef)) {
        if (unique[docRef] < date) {
          unique.set(docRef, date);
        }
      } else {
        unique.set(docRef, date);
      }
    });

    return Array.from(unique).sort((a, b) => {
      return a.values[1] - b.values[1];
    });
  }

  private getImageDataWithDocId(uniqueImageDocs: [String, any][]) {
    let promises = [];

    uniqueImageDocs.forEach((doc) => {
      const docRef = doc[0] as string;
      const promise = this.imageService.getImageDataByDocRef(doc[0] as string);
      promises.push(promise);
    });

    return promises;
  }
}
