import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: string;
  email: string;
  observer: Unsubscribe;

  constructor(private userService: UserService, private router: Router) {
    const userProfileData = this.userService.getUserProfile();
    this.displayName = userProfileData[0];
    this.email = userProfileData[1];

    const docRef = this.userService.getDocRef();
    this.observer = onSnapshot(
      docRef,
      (docSnapshot) => {
        this.displayName = docSnapshot.data().displayName;
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  ngOnInit() {}

  navToEditProfile() {
    this.router.navigateByUrl(routePaths.EDIT_PROFILE);
  }
}
