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

  createUser(userCred: UserCredential, displayName: string) {
    const postData: UserPostData = {
      displayName: displayName,
      email: userCred.user.email,
      uid: userCred.user.uid,
    };
    this.storeService.post(this.dbPath, postData);
  }

  updateUser(user, updateData: any) {
    this.storeService.updateUser(this.dbPath, updateData, user.uid);
  }

  private async getUser(uid: string) {
    const snapshot = await this.storeService.getSnapshotChange(
      this.dbPath,
      () => where('uid', '==', uid)
    );

    this.docId = snapshot.id;
    this.user = snapshot.data() as User;
  }

  get getUserProfile() {
    const displayName = this.user.displayName;
    const email = this.user.email;
    return [displayName, email];
  }
}
