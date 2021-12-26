import { Component, Input, OnInit } from '@angular/core';
import { ImageData } from 'src/app/types/image.types';

@Component({
  selector: 'app-booster-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input()
  imageData: ImageData;

  constructor() {}

  ngOnInit() {}

  get title() {
    return this.imageData?.title;
  }

  get description() {
    return this.imageData?.description;
  }

  get downloadUrl() {
    return this.imageData?.downloadUrl;
  }
}
