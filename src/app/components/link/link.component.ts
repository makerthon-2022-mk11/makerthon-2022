import { LinkDataFromDb } from './../../types/link.types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() link: LinkDataFromDb;

  constructor() {}

  ngOnInit(): void {}
}
