import { Component, OnInit } from '@angular/core';
import { ImageSelectData } from 'src/app/types/image.types';

@Component({
  selector: 'app-shared-images',
  templateUrl: './shared-images.page.html',
  styleUrls: ['./shared-images.page.scss'],
})
export class SharedImagesPage implements OnInit {
  isSelectableMode: boolean = false;
  _imageDatas: ImageSelectData[];

  constructor() {}

  ngOnInit() {}

  enterSelectMode() {
    this.isSelectableMode = true;
  }

  exitSelectMode() {
    this.isSelectableMode = false;
  }

  hasTitle(imageData: ImageSelectData) {
    return imageData.title;
  }

  toggleItemIsSelected(imageData: ImageSelectData) {
    imageData.isSelected = !imageData.isSelected;
  }

  get imageDatas() {
    return this._imageDatas;
  }
}
