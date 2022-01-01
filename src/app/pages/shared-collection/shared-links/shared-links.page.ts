import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/link.service';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { LinkData, LinkSelectData } from 'src/app/types/link.types';

@Component({
  selector: 'app-shared-links',
  templateUrl: './shared-links.page.html',
  styleUrls: ['./shared-links.page.scss'],
})
export class SharedLinksPage implements OnInit {
  isSelectableMode: boolean = false;
  _linkDatas: LinkSelectData[];

  constructor(
    private linkService: LinkService,
    private routerService: RouterService,
    private userService: UserService
  ) {
    this.routerService.getReloadSubject().subscribe((isReload) => {
      if (isReload) {
        this._linkDatas = undefined;
      }
    });
  }

  ngOnInit() {}

  enterSelectMode() {
    this.isSelectableMode = true;
  }

  exitSelectMode() {
    this.isSelectableMode = false;
  }

  hasTitle(linkData: LinkSelectData) {
    return linkData.title;
  }

  toggleItemIsSelected(linkData: LinkSelectData) {
    linkData.isSelected = !linkData.isSelected;
  }

  get linkDatas() {
    if (this.userService.user && !this._linkDatas) {
      this.linkService.getUniqueSharedLinks().then((links) => {
        this._linkDatas = links.map((text) => ({
          ...text,
          isSelected: false,
        }));
      });
    }
    return this._linkDatas;
  }
}
