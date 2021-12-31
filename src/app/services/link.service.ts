import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import {
  LinkData,
  LinkFormData,
  LinkPostData,
  LinkDataFromDb,
} from '../types/link.types';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = 'links';

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}

  create(linkFormData: LinkFormData) {
    const postData: LinkPostData = {
      ...linkFormData,
      userRef: this.userService.docId,
    };

    return this.storeService.post(this.dbPath, postData);
  }

  getLinksDataByUser() {
    let links = [];
    const snapshot = this.storeService
      .getSnapshotChanges(this.dbPath, () =>
        where('userRef', '==', this.userService.docId)
      )
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          delete data.userRef;

          links.push(data);
        });
      });

    return links;
  }

  async getLinkDataByDocRef(docRef: string) {
    const doc = await this.storeService.getDoc(this.dbPath, docRef);

    const linkData = {
      title: doc.data().title,
      description: doc.data().description,
      link: doc.data().link,
      docRef: docRef,
    } as LinkDataFromDb;

    return linkData;
  }

  async getRandom(): Promise<LinkData> {
    const doc = await this.storeService.getRandomDoc(this.dbPath, () =>
      where('userRef', '==', this.userService.docId)
    );

    return doc.data() as LinkData;
  }
}
