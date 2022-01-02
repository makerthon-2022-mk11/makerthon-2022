import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor() {}

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

  updateIsSelectableMode() {
    this.isSelectableModeChange.emit(this.isSelectableMode);
  }
}
