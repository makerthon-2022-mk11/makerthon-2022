import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { SharedAllPage } from './shared-all/shared-all.page';
import { SharedImagesPage } from './shared-images/shared-images.page';
import { SharedLinksPage } from './shared-links/shared-links.page';
import { SharedTextsPage } from './shared-texts/shared-texts.page';

@Component({
  selector: 'app-shared-collection',
  templateUrl: './shared-collection.page.html',
  styleUrls: ['./shared-collection.page.scss'],
})
export class SharedCollectionPage implements OnInit {
  all = SharedAllPage;
  images = SharedImagesPage;
  links = SharedLinksPage;
  texts = SharedTextsPage;

  constructor(private routerService: RouterService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.routerService.reload();
  }
}
