import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareLinkService } from 'src/app/services/share/share-link.service';

@Component({
  selector: 'app-send-link',
  templateUrl: './send-link.page.html',
  styleUrls: ['./send-link.page.scss'],
})
export class SendLinkPage implements OnInit {
  constructor(
    private shareLinkService: ShareLinkService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
