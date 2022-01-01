import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/services/text.service';
import { UserService } from 'src/app/services/user.service';
import { TextData, TextSelectData } from 'src/app/types/text.types';

@Component({
  selector: 'app-shared-texts',
  templateUrl: './shared-texts.page.html',
  styleUrls: ['./shared-texts.page.scss'],
})
export class SharedTextsPage implements OnInit {
  isSelectableMode: boolean = false;
  _textDatas: TextSelectData[];

  constructor(
    private textService: TextService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  hasTitle(textData: TextData) {
    return textData.title;
  }

  enterSelectMode() {
    this.isSelectableMode = true;
  }

  exitSelectMode() {
    this.isSelectableMode = false;
  }

  toggleItemIsSelected(textData: TextSelectData) {
    textData.isSelected = !textData.isSelected;
  }

  get textDatas() {
    if (this.userService.user && !this._textDatas) {
      this.textService.getUniqueSharedTexts().then((texts) => {
        this._textDatas = texts.map((text) => ({ ...text, isSelected: false }));
      });
    }

    return this._textDatas;
  }
}
