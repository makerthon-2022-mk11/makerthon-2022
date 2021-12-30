import { TextDataFromDb } from './../../types/text.types';
import { Component, Input, OnInit } from '@angular/core';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() text: TextDataFromDb;

  constructor() {}

  ngOnInit(): void {}
}
