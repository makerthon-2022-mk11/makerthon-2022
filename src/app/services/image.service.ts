import { Injectable } from '@angular/core';
import { serverTimestamp, where } from '@angular/fire/firestore';
import {
  ImagePostData,
  ImageUploadData,
  ImageData,
  ImageDeleteData,
  ImageFormData,
  ImagePutData,
} from '../types/image.types';
import { UploadData } from '../types/storage.types';
import { ShareImageService } from './share-image.service';
import { StorageService } from './storage.service';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  dbPath = 'images';

  constructor(
    private shareImageService: ShareImageService,
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
      creatorRef: this.userService.docId,
      title: imageUploadData.title,
      description: imageUploadData.description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    return this.create(postData);
  }

  private create(imagePostData: ImagePostData) {
    return this.storeService.post(this.dbPath, imagePostData);
  }

  async update(imageFormData: ImageFormData, docId: string) {
    const putData: ImagePutData = {
      ...imageFormData,
      updatedAt: serverTimestamp(),
    };

    return this.storeService.update(this.dbPath, putData, docId);
  }

  async delete(imageDeleteData: ImageDeleteData) {
    await this.storageService.delete(imageDeleteData.storageRef);
    await this.storeService.delete(this.dbPath, imageDeleteData.docId);
    return this.shareImageService.deleteSharedImages(imageDeleteData.docId);
  }

  async deleteMultiple(imageDeleteDatas: ImageDeleteData[]) {
    const promises = imageDeleteDatas.map((imageDeleteData) =>
      this.delete(imageDeleteData)
    );
    return Promise.all(promises);
  }

  async get(docId: string) {
    const doc = await this.storeService.getDocById(this.dbPath, docId);
    const downloadUrl: string = await this.storageService.getDownloadUrl(
      doc.data().storageRef
    );
    return {
      ...doc.data(),
      downloadUrl: downloadUrl,
      docId: doc.id,
    } as ImageData;
  }

  async getRandom() {
    const docId: string = await this.shareImageService.getRandomOwnImageRef();
    const doc = await this.storeService.getDocById(this.dbPath, docId);
    const downloadUrl: string = await this.storageService.getDownloadUrl(
      doc.data().storageRef
    );

    return {
      ...doc.data(),
      docId: doc.id,
      downloadUrl: downloadUrl,
    } as ImageData;
  }

  async getUniqueOwnImages(): Promise<ImageData[]> {
    const imageIds: string[] =
      await this.shareImageService.getUniqueOwnImageRefs();

    const imageDocs = await this.storeService.getDocsByIds(
      this.dbPath,
      imageIds
    );

    const promises = imageDocs.map(async (doc) => ({
      creatorRef: doc.data().creatorRef,
      storageRef: doc.data().storageRef,
      title: doc.data().title,
      description: doc.data().description,
      docId: doc.id,
      downloadUrl: await this.storageService.getDownloadUrl(
        doc.data().storageRef
      ),
    }));

    return Promise.all(promises);
  }

  async getUniqueSharedImages(): Promise<ImageData[]> {
    const imageIds: string[] =
      await this.shareImageService.getUniqueSharedImageRefs();

    const imageDocs = await this.storeService.getDocsByIds(
      this.dbPath,
      imageIds
    );

    const promises = imageDocs.map(async (doc) => ({
      creatorRef: doc.data().creatorRef,
      storageRef: doc.data().storageRef,
      title: doc.data().title,
      description: doc.data().description,
      docId: doc.id,
      downloadUrl: await this.storageService.getDownloadUrl(
        doc.data().storageRef
      ),
    }));

    return Promise.all(promises);
  }
}
