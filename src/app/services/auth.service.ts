import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: firebase.default.User;
  isLoggedIn: boolean;
  isVerified: boolean;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
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

  login(email, password) {
    return this.ngFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.userData = userCred.user;
        this.isLoggedIn = true;
        this.isVerified = userCred.user.emailVerified;
      });
  }

  logout(): Promise<void> {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  signUp(email, password) {
    return this.ngFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => this.userService.createUser(userCred));
  }

  async sendEmailVerification() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification();
  }

  resetPassword(email): Promise<void> {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }
}
