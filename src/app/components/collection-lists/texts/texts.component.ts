import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextSelectData } from 'src/app/types/text.types';

@Component({
  selector: 'app-collection-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss'],
})
export class TextsComponent implements OnInit {
  @Input()
  isSelectableMode: boolean;

  @Output()
  isSelectableModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  textDatas: TextSelectData[];

  @Output()
  share: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  enterSelectMode() {
    this.isSelectableMode = true;
    this.updateIsSelectableMode();
  }

  exitSelectMode() {
    this.isSelectableMode = false;
    this.updateIsSelectableMode();
  }

  hasTitle(textData: TextSelectData) {
    return textData.title;
  }

  toggleItemIsSelected(textData: TextSelectData) {
    textData.isSelected = !textData.isSelected;
  }

  onShare() {
    this.share.emit();
  }

  updateIsSelectableMode() {
    this.isSelectableModeChange.emit(this.isSelectableMode);
  }
}
