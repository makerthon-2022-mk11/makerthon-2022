import { Component, OnInit } from '@angular/core';
import { TextData, TextSelectData } from 'src/app/types/text.types';

@Component({
  selector: 'app-shared-texts',
  templateUrl: './shared-texts.page.html',
  styleUrls: ['./shared-texts.page.scss'],
})
export class SharedTextsPage implements OnInit {
  isSelectableMode: boolean = false;
  texts: TextSelectData[] = [
    {
      title: 'hello',
      text: 'A fine sunny day',
      docId: 'random',
      isSelected: false,
    },
    {
      title: 'hello',
      description: 'Chocolate pudding',
      text: 'I want to eat',
      docId: 'random',
      isSelected: false,
    },
    { text: 'Random just a little random', docId: 'random', isSelected: false },
    {
      title: 'wowow',
      text: 'A very long text A very long text A very long text A very long text A very long text A very long text A very long text',
      docId: 'random',
      isSelected: false,
    },
    {
      title: 'wowow',
      text: 'A fine sunny day',
      docId: 'random',
      isSelected: false,
    },
    {
      title: 'wowow',
      text: 'A fine sunny day',
      docId: 'random',
      isSelected: false,
    },
    {
      title: 'wowow',
      text: 'A fine sunny day',
      docId: 'random',
      isSelected: false,
    },
    {
      title: 'wowow',
      text: 'A fine sunny day',
      docId: 'random',
      isSelected: false,
    },
  ];

  constructor() {}

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
}
