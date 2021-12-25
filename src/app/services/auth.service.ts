import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { User } from '../types/user.types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User;

  constructor(private auth: Auth, private userService: UserService) {
    if (auth) {
      authState(this.auth).subscribe((user) => {
        if (user) {
          this.setUser(user);
        } else {
          localStorage.setItem('user', null);
        }
      });
    }
  }

  get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user?.emailVerified;
  }

  get isLoggedIn(): boolean {
    return this.isVerified && localStorage.getItem('user') != null;
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (userCred) => {
        this.setUser(userCred.user);
      }
    );
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
    });
  }

  signUp(email, password, displayName) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCred) => this.userService.createUser(userCred, displayName)
    );
  }

  async sendEmailVerification() {
    const user = await this.auth.currentUser;
    return sendEmailVerification(user);
  }

  resetPassword(email): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  private setUser(user: User) {
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
  }

  async isDisplayNameAlreadyUsed(displayName: string) {
    return await this.userService.isDisplayNameAlreadyUsed(displayName);
  }
}
