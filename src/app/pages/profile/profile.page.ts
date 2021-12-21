import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: string;
  email: string;

  constructor(private userService: UserService) {
    const userProfileData = this.userService.getUserProfile;
    this.displayName = userProfileData[0];
    this.email = userProfileData[1];
  }

  ngOnInit() {}
}
