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
        this.initialize(authUser.uid);
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

  updateDisplayName(displayName: string) {
    const updatedData = {
      displayName: displayName,
    };

    return this.storeService.update(this.dbPath, updatedData, this.docId);
  }

  async isDisplayNameAlreadyUsed(displayName: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('displayName', '==', displayName)
    );

    return snapshot != null;
  }

  private async initialize(uid: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('uid', '==', uid)
    );

    this.docId = snapshot.id;
    this.user = snapshot.data() as User;

    const docRef = this.storeService.getDocRef(this.dbPath, this.docId);
    this.observer = onSnapshot(docRef, (docSnapshot) => {
      this.user = docSnapshot.data() as User;
    });
  }
}
