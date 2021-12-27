import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareLinkService } from 'src/app/services/share/share-link.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { ShareImageService } from 'src/app/services/share/share-image.service';

@Component({
  selector: 'app-send-all',
  templateUrl: './send-all.page.html',
  styleUrls: ['./send-all.page.scss'],
})
export class SendAllPage implements OnInit {
  constructor(
    private shareLinkService: ShareLinkService,
    private shareTextService: ShareTextService,
    private shareImageService: ShareImageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
