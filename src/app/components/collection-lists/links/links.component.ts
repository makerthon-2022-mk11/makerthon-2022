import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkSelectData } from 'src/app/types/link.types';

@Component({
  selector: 'app-collection-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  @Input()
  isSelectableMode: boolean;

  @Output()
  isSelectableModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  linkDatas: LinkSelectData[];

  @Output()
  share: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

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

  hasTitle(linkData: LinkSelectData) {
    return linkData.title;
  }

  toggleItemIsSelected(linkData: LinkSelectData) {
    linkData.isSelected = !linkData.isSelected;
  }

  onShare() {
    this.share.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  updateIsSelectableMode() {
    this.isSelectableModeChange.emit(this.isSelectableMode);
  }
}
