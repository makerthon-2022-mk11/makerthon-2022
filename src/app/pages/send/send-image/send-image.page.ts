import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareImageService } from 'src/app/services/share/share-image.service';

@Component({
  selector: 'app-send-image',
  templateUrl: './send-image.page.html',
  styleUrls: ['./send-image.page.scss'],
})
export class SendImagePage implements OnInit {
  constructor(
    private shareImageService: ShareImageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
