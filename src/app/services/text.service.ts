import { Injectable } from '@angular/core';
import { serverTimestamp, where } from '@angular/fire/firestore';
import {
  TextData,
  TextFormData,
  TextPostData,
  TextPutData,
} from '../types/text.types';
import { ShareTextService } from './share-text.service';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private dbPath = 'texts';

  constructor(
    private shareTextService: ShareTextService,
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(textFormData: TextFormData) {
    const postData: TextPostData = {
      ...textFormData,
      creatorRef: this.userService.docId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    return this.storeService.post(this.dbPath, postData);
  }

  async update(textFormData: TextFormData, docId: string) {
    const putData: TextPutData = {
      ...textFormData,
      updatedAt: serverTimestamp(),
    };

    return this.storeService.update(this.dbPath, putData, docId);
  }

  async delete(docId: string) {
    await this.storeService.delete(this.dbPath, docId);
    return this.shareTextService.deleteSharedTexts(docId);
  }

  async deleteMultiple(docIds: string[]) {
    const promises = docIds.map((docId) => this.delete(docId));
    return Promise.all(promises);
  }

  async get(docId: string) {
    const doc = await this.storeService.getDocById(this.dbPath, docId);
    return { ...doc.data(), docId: doc.id } as TextData;
  }

  async getRandom(): Promise<TextData> {
    const docId: string = await this.shareTextService.getRandomOwnTextRef();
    const doc = await this.storeService.getDocById(this.dbPath, docId);

    return { ...doc.data(), docId: doc.id } as TextData;
  }

  async getUniqueOwnTexts(): Promise<TextData[]> {
    const textIds: string[] =
      await this.shareTextService.getUniqueOwnTextRefs();

    return this.storeService.getDocsByIds(this.dbPath, textIds).then((docs) =>
      docs.map(
        (doc) =>
          ({
            ...doc.data(),
            docId: doc.id,
          } as TextData)
      )
    );
  }

  async getUniqueSharedTexts(): Promise<TextData[]> {
    const textIds: string[] =
      await this.shareTextService.getUniqueSharedTextRefs();

    return this.storeService.getDocsByIds(this.dbPath, textIds).then((docs) =>
      docs.map(
        (doc) =>
          ({
            ...doc.data(),
            docId: doc.id,
          } as TextData)
      )
    );
  }
}
