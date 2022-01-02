import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LinkService } from 'src/app/services/link.service';
import { UserService } from 'src/app/services/user.service';
import { LinkData } from 'src/app/types/link.types';

@Component({
  selector: 'app-view-link',
  templateUrl: './view-link.page.html',
  styleUrls: ['./view-link.page.scss'],
})
export class ViewLinkPage implements OnInit {
  docId: string;
  linkData: LinkData;
  ballUrl = `../../../assets/images/gacha/gacha-balls/1.png`;

  constructor(
    route: ActivatedRoute,
    private navCtrl: NavController,
    private linkService: LinkService,
    private userService: UserService
  ) {
    route.params.subscribe((params) => {
      this.docId = params['id'];
      if (this.docId) {
        this.fetchData();
      }
    });
  }

  ngOnInit() {}

  isOwner() {
    return this.linkData?.creatorRef === this.userService?.docId;
  }

  fetchData() {
    this.linkService.get(this.docId).then((data) => (this.linkData = data));
  }

  hasTitle() {
    return this.linkData?.title;
  }

  hasDescription() {
    return this.linkData?.description;
  }

  goBack() {
    this.navCtrl.back();
  }
}
