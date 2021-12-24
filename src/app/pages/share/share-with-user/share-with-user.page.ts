import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareLinkService } from 'src/app/services/share/share-link.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { ShareImageService } from 'src/app/services/share/share-image.service';

@Component({
  selector: 'app-share-with-user',
  templateUrl: './share-with-user.page.html',
  styleUrls: ['./share-with-user.page.scss'],
})
export class ShareWithUserPage implements OnInit {
  constructor(
    private shareLinkService: ShareLinkService,
    private shareTextService: ShareTextService,
    private shareImageService: ShareImageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
