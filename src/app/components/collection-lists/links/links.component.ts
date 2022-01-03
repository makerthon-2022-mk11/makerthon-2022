import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { routePaths } from 'src/app/constants/routing.constants';
import { LinkSelectData } from 'src/app/types/link.types';
import { formatLink } from 'src/app/utils/link.util';

@Component({
  selector: 'app-collection-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  @Input()
  isSelectableMode: boolean;

  @Output()
  isSelectableModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  linkDatas: LinkSelectData[];

  @Output()
  share: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {}

  enterSelectMode() {
    this.isSelectableMode = true;
    this.updateIsSelectableMode();
  }

  exitSelectMode() {
    this.isSelectableMode = false;
    this.updateIsSelectableMode();
  }

  hasTitle(linkData: LinkSelectData) {
    return linkData.title;
  }

  toggleItemIsSelected(linkData: LinkSelectData) {
    linkData.isSelected = !linkData.isSelected;
  }

  onShare() {
    this.share.emit();
  }

  showDeleteAlert() {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'This deletes the content for all users, including yourself',
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Delete',
            handler: () => this.delete.emit(),
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  onDelete() {
    this.showDeleteAlert();
  }

  updateIsSelectableMode() {
    this.isSelectableModeChange.emit(this.isSelectableMode);
  }

  navToView(linkData: LinkSelectData) {
    this.router.navigateByUrl(`${routePaths.LINKS}/${linkData.docId}`);
  }

  formatLink(link: string) {
    return formatLink(link);
  }
}
