import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: string;
  email: string;

  constructor(private userService: UserService, private router: Router) {
    const userProfileData = this.userService.getUserProfile;
    this.displayName = userProfileData[0];
    this.email = userProfileData[1];
  }

  ngOnInit() {}

  navToEditProfile() {
    this.router.navigateByUrl(routePaths.EDIT_PROFILE);
  }
}
