import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { MyImagesPage } from './my-images/my-images.page';
import { MyLinksPage } from './my-links/my-links.page';
import { MyTextsPage } from './my-texts/my-texts.page';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.page.html',
  styleUrls: ['./my-collection.page.scss'],
})
export class MyCollectionPage implements OnInit {
  images = MyImagesPage;
  links = MyLinksPage;
  texts = MyTextsPage;

  constructor(private routerService: RouterService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.routerService.reloadMyCollection();
  }
}
