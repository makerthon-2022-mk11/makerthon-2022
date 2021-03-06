import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { routePaths } from 'src/app/constants/routing.constants';
import { ImageSelectData } from 'src/app/types/image.types';

@Component({
  selector: 'app-collection-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input()
  isSelectableMode: boolean;

  @Output()
  isSelectableModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  imageDatas: ImageSelectData[];

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

  hasTitle(imageData: ImageSelectData) {
    return imageData.title;
  }

  toggleItemIsSelected(imageData: ImageSelectData) {
    imageData.isSelected = !imageData.isSelected;
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

  navToView(imageData: ImageSelectData) {
    this.router.navigateByUrl(`${routePaths.IMAGES}/${imageData.docId}`);
  }
}
