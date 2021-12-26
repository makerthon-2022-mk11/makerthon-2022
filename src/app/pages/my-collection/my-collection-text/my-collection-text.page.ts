import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-my-collection-text',
  templateUrl: './my-collection-text.page.html',
  styleUrls: ['./my-collection-text.page.scss'],
})
export class MyCollectionTextPage implements OnInit {
  requests:Promise<any[]>;
  textList: any[] = [];
  constructor() { }

  ngOnInit() {
    TextService.getText()
  }

}
