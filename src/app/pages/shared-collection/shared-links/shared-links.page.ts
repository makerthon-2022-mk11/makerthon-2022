import { Component, OnInit } from '@angular/core';
import { LinkData, LinkSelectData } from 'src/app/types/link.types';

@Component({
  selector: 'app-shared-links',
  templateUrl: './shared-links.page.html',
  styleUrls: ['./shared-links.page.scss'],
})
export class SharedLinksPage implements OnInit {
  isSelectableMode: boolean = false;
  _linkDatas: LinkSelectData[];

  constructor() {}

  ngOnInit() {}

  enterSelectMode() {
    this.isSelectableMode = true;
  }

  exitSelectMode() {
    this.isSelectableMode = false;
  }

  hasTitle(linkData: LinkData) {
    return linkData.title;
  }

  toggleItemIsSelected(linkData: LinkSelectData) {
    linkData.isSelected = !linkData.isSelected;
  }

  get linkDatas() {
    return this._linkDatas;
  }
}
