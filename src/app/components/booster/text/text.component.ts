import { Component, Input, OnInit } from '@angular/core';
import { TextData } from 'src/app/types/text.types';

@Component({
  selector: 'app-booster-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input()
  textData: TextData;

  constructor() {}

  ngOnInit() {}

  get title() {
    return this.textData?.title;
  }

  get description() {
    return this.textData?.description;
  }

  get text() {
    return this.textData?.text;
  }
}
