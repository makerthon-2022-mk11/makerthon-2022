import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TextService } from 'src/app/services/text.service';
import { UserService } from 'src/app/services/user.service';
import { TextData } from 'src/app/types/text.types';

@Component({
  selector: 'app-view-text',
  templateUrl: './view-text.page.html',
  styleUrls: ['./view-text.page.scss'],
})
export class ViewTextPage implements OnInit {
  docId: string;
  textData: TextData;
  ballUrl = `../../../assets/images/gacha/gacha-balls/0.png`;

  constructor(
    route: ActivatedRoute,
    private navCtrl: NavController,
    private textService: TextService,
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
    return this.textData?.creatorRef === this.userService?.docId;
  }

  fetchData() {
    this.textService.get(this.docId).then((data) => (this.textData = data));
  }

  hasTitle() {
    return this.textData?.title;
  }

  hasDescription() {
    return this.textData?.description;
  }

  goBack() {
    this.navCtrl.back();
  }
}
