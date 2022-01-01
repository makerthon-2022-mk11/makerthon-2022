import { Injectable } from '@angular/core';
import { serverTimestamp, where } from '@angular/fire/firestore';
import { TextData, TextFormData, TextPostData } from '../types/text.types';
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

  async getRandom(): Promise<TextData> {
    const snapshot = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('creatorRef', '==', this.userService.docId)
    );

    return { ...snapshot.data(), docId: snapshot.id } as TextData;
  }

  async getUniqueSharedTexts(): Promise<TextData[]> {
    const textIds: string[] =
      await this.shareTextService.getUniqueSharedTextRefs();

    return this.storeService.getDocsByIds(this.dbPath, textIds).then((docs) =>
      docs.map((doc) => ({
        text: doc.data().text,
        title: doc.data().title,
        description: doc.data().description,
        docId: doc.id,
      }))
    );
  }
}
