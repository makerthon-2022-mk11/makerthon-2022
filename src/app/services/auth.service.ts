import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: firebase.default.User;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    const isVerified = user.emailVerified;

    if (isVerified == null) {
      return false;
    }
    return isVerified;
  }

  login(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
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
