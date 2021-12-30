import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ImageDataFromDb } from 'src/app/types/image.types';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() image: ImageDataFromDb;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  // getImage(storageRef) {
  //   this.imageService.getImage(storageRef);
  // }
}
