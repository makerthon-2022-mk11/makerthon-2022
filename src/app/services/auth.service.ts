import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private ngFireAuth: AngularFireAuth) {
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

  login(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}