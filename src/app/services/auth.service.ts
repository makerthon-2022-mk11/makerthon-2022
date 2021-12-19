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
  isLoggedIn: boolean;
  isVerified: boolean;

  constructor(private auth: Auth, private userService: UserService) {
    if (auth) {
      authState(this.auth).subscribe((user) => {
        if (user) {
          this.userData = user;
          this.isLoggedIn = user !== null;
          this.isVerified = user.emailVerified;
          localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
          localStorage.setItem('user', null);
        }
      });
    }
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (userCred) => {
        this.userData = userCred.user;
        this.isLoggedIn = true;
        this.isVerified = userCred.user.emailVerified;
      }
    );
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
    });
  }

  signUp(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCred) => this.userService.createUser(userCred)
    );
  }

  async sendEmailVerification() {
    const user = await this.auth.currentUser;
    return sendEmailVerification(user);
  }

  resetPassword(email): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}
