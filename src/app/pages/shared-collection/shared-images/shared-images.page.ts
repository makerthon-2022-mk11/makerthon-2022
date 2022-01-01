import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { ImageSelectData } from 'src/app/types/image.types';

@Component({
  selector: 'app-shared-images',
  templateUrl: './shared-images.page.html',
  styleUrls: ['./shared-images.page.scss'],
})
export class SharedImagesPage implements OnInit {
  isSelectableMode: boolean = false;
  hasLoaded: boolean = false;
  _imageDatas: ImageSelectData[];

  constructor(
    private imageService: ImageService,
    private routerService: RouterService,
    private userService: UserService
  ) {
    this.routerService.getReloadSubject().subscribe((isReload) => {
      if (isReload) {
        this.hasLoaded = false;
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

  hasTitle(imageData: ImageSelectData) {
    return imageData.title;
  }

  toggleItemIsSelected(imageData: ImageSelectData) {
    imageData.isSelected = !imageData.isSelected;
  }

  get imageDatas() {
    if (this.userService.user && !this.hasLoaded) {
      this.hasLoaded = true;
      this.imageService.getUniqueSharedImages().then((images) => {
        this._imageDatas = images.map((image) => ({
          ...image,
          isSelected: false,
        }));
      });
    }

    return this._imageDatas;
  }
}
