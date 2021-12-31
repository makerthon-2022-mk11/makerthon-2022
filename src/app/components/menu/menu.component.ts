import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pages = [
    {
      name: 'Home',
      path: routePaths.HOME,
    },
    {
      name: 'Upload',
      path: routePaths.UPLOAD,
    },
    {
      name: 'Shared Collection',
      path: routePaths.SHARED_COLLECTION,
    },
    {
      name: 'Profile',
      path: routePaths.PROFILE,
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl(routePaths.LOGIN);
    });
  }
}
