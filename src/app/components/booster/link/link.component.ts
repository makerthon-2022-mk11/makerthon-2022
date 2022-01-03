import { Component, Input, OnInit } from '@angular/core';
import { LinkData } from 'src/app/types/link.types';
import { formatLink } from 'src/app/utils/link.util';

@Component({
  selector: 'app-booster-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input()
  linkData: LinkData;

  constructor() {}

  ngOnInit() {}

  get title() {
    return this.linkData?.title;
  }

  get description() {
    return this.linkData?.description;
  }

  get link() {
    return this.linkData?.link;
  }

  formatLink(link: string) {
    return formatLink(link);
  }
}
