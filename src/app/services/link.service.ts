import { Injectable } from '@angular/core';
import { serverTimestamp, where } from '@angular/fire/firestore';
import {
  LinkData,
  LinkFormData,
  LinkPostData,
  LinkPutData,
} from '../types/link.types';
import { ShareLinkService } from './share-link.service';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = 'links';

  constructor(
    private shareLinkService: ShareLinkService,
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(formData: LinkFormData) {
    const postData: LinkPostData = {
      ...formData,
      creatorRef: this.userService.docId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    return this.storeService.post(this.dbPath, postData);
  }

  async update(linkFormData: LinkFormData, docId: string) {
    const putData: LinkPutData = {
      ...linkFormData,
      updatedAt: serverTimestamp(),
    };

    return this.storeService.update(this.dbPath, putData, docId);
  }

  async delete(docId: string) {
    await this.storeService.delete(this.dbPath, docId);
    return this.shareLinkService.deleteSharedLinks(docId);
  }

  async deleteMultiple(docIds: string[]) {
    const promises = docIds.map((docId) => this.delete(docId));
    return Promise.all(promises);
  }

  async get(docId: string) {
    const doc = await this.storeService.getDocById(this.dbPath, docId);
    return { ...doc.data(), docId: doc.id } as LinkData;
  }

  async getRandom(): Promise<LinkData> {
    const docId: string = await this.shareLinkService.getRandomOwnLinkRef();
    const doc = await this.storeService.getDocById(this.dbPath, docId);

    return { ...doc.data(), docId: doc.id } as LinkData;
  }

  async getUniqueOwnLinks(): Promise<LinkData[]> {
    const linkIds: string[] =
      await this.shareLinkService.getUniqueOwnLinkRefs();

    return this.storeService.getDocsByIds(this.dbPath, linkIds).then((docs) =>
      docs.map(
        (doc) =>
          ({
            ...doc.data(),
            docId: doc.id,
          } as LinkData)
      )
    );
  }

  async getUniqueSharedLinks(): Promise<LinkData[]> {
    const linkIds: string[] =
      await this.shareLinkService.getUniqueSharedLinkRefs();

    return this.storeService.getDocsByIds(this.dbPath, linkIds).then((docs) =>
      docs.map(
        (doc) =>
          ({
            ...doc.data(),
            docId: doc.id,
          } as LinkData)
      )
    );
  }
}
