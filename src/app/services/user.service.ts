import { Injectable } from '@angular/core';
import { Auth, authState, UserCredential } from '@angular/fire/auth';
import { where, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { User, UserPostData } from '../types/user.types';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = 'users';
  docId: string;
  user: User;
  observer: Unsubscribe;

  constructor(auth: Auth, private storeService: StoreService) {
    authState(auth).subscribe((authUser) => {
      if (authUser) {
        this.getUser(authUser.uid);
      }
    });
  }

  createUser(userCred: UserCredential, displayName: string) {
    const postData: UserPostData = {
      displayName: displayName,
      email: userCred.user.email,
      uid: userCred.user.uid,
    };
    this.storeService.post(this.dbPath, postData);
  }

  async updateDisplayName(displayName: string) {
    return await this.storeService.updateDisplayname(
      this.dbPath,
      displayName,
      this.user.uid
    );
  }

  async isDisplayNameAlreadyUsed(displayName: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('displayName', '==', displayName)
    );

    return snapshot != null;
  }

  private async getUser(uid: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('uid', '==', uid)
    );

    this.docId = snapshot.id;
    this.user = snapshot.data() as User;

    const docRef = this.storeService.getObservableDoc(this.dbPath, this.docId);
    this.observer = onSnapshot(
      docRef,
      (docSnapshot) => {
        this.user = docSnapshot.data() as User;
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  getDocRef() {
    return this.storeService.getObservableDoc(this.dbPath, this.docId);
  }

  getUserProfile() {
    const displayName = this.user.displayName;
    const email = this.user.email;
    return [displayName, email];
  }
}
