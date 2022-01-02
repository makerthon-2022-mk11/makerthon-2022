import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { ImageData } from 'src/app/types/image.types';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {
  docId: string;
  imageData: ImageData;
  ballUrl = `../../../assets/images/gacha/gacha-balls/2.png`;

  constructor(
    route: ActivatedRoute,
    private navCtrl: NavController,
    private imageService: ImageService
  ) {
    route.params.subscribe((params) => {
      this.docId = params['id'];
      if (this.docId) {
        this.fetchData();
      }
    });
  }

  ngOnInit() {}

  fetchData() {
    this.imageService.get(this.docId).then((data) => (this.imageData = data));
  }

  hasTitle() {
    return this.imageData?.title;
  }

  hasDescription() {
    return this.imageData?.description;
  }

  hasDownloadUrl() {
    return this.imageData?.downloadUrl;
  }

  goBack() {
    this.navCtrl.back();
  }
}
