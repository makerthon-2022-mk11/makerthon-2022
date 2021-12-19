import { Injectable } from '@angular/core';
import { Auth, authState, UserCredential } from '@angular/fire/auth';
import { where } from '@angular/fire/firestore';
import { User, UserPostData } from '../types/user.types';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = 'users';
  docId: string;
  user: User;

  constructor(auth: Auth, private storeService: StoreService) {
    authState(auth).subscribe((authUser) => {
      if (authUser) {
        this.getUser(authUser.uid);
      }
    });
  }

  createUser(userCred: UserCredential) {
    const postData: UserPostData = {
      email: userCred.user.email,
      uid: userCred.user.uid,
    };
    this.storeService.post(this.dbPath, postData);
  }

  private async getUser(uid: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('uid', '==', uid)
    );

    this.docId = snapshot.id;
    this.user = snapshot.data() as User;
  }
}
