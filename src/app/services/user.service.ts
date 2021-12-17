import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../types/user.types';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/users';
  docId: string;
  user: User;

  constructor(ngFireAuth: AngularFireAuth, private storeService: StoreService) {
    ngFireAuth.authState.subscribe((authUser) => {
      this.getUser(authUser.uid);
    });
  }

  private getUser(uid: string) {
    this.storeService
      .getSnapshotChange(this.dbPath, (ref) =>
        ref.where('uid', '==', uid).limit(1)
      )
      .subscribe((action) => {
        this.user = action.payload.doc.data() as User;
        this.docId = action.payload.doc.id;
      });
  }

  get userDocPath() {
    return `${this.dbPath}/${this.docId}`;
  }
}
