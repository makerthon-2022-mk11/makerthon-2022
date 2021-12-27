import { Component, OnInit } from '@angular/core';
import { UploadImagePage } from './upload-image/upload-image.page';
import { UploadLinkPage } from './upload-link/upload-link.page';
import { UploadTextPage } from './upload-text/upload-text.page';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  uploadImage = UploadImagePage;
  uploadLink = UploadLinkPage;
  uploadText = UploadTextPage;

  constructor() {}

  ngOnInit() {}
}
