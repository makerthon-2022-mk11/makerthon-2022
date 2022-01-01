import { Injectable } from '@angular/core';
import { serverTimestamp, where } from '@angular/fire/firestore';
import { LinkData, LinkFormData, LinkPostData } from '../types/link.types';
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

  async getRandom(): Promise<LinkData> {
    const doc = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('creatorRef', '==', this.userService.docId)
    );

    return doc.data() as LinkData;
  }

  async getUniqueSharedLinks(): Promise<LinkData[]> {
    const linkIds: string[] =
      await this.shareLinkService.getUniqueSharedLinkRefs();

    return this.storeService.getDocsByIds(this.dbPath, linkIds).then((docs) =>
      docs.map((doc) => ({
        link: doc.data().link,
        title: doc.data().title,
        description: doc.data().description,
        docId: doc.id,
      }))
    );
  }
}
