import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareLinkService } from 'src/app/services/share/share-link.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { ShareImageService } from 'src/app/services/share/share-image.service';

@Component({
  selector: 'app-share-by-user',
  templateUrl: './share-by-user.page.html',
  styleUrls: ['./share-by-user.page.scss'],
})
export class ShareByUserPage implements OnInit {
  constructor(
    private shareLinkService: ShareLinkService,
    private shareTextService: ShareTextService,
    private shareImageService: ShareImageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
