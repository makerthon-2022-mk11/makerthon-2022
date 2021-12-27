import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';

@Component({
  selector: 'app-send-text',
  templateUrl: './send-text.page.html',
  styleUrls: ['./send-text.page.scss'],
})
export class SendTextPage implements OnInit {
  constructor(
    private shareTextService: ShareTextService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
