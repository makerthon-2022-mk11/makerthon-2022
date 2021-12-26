import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss'],
})
export class TextDisplayComponent implements OnInit {
  textList = TextService.getText();
  constructor() { }

  ngOnInit() {}

}
