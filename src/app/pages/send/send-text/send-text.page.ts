import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { Observable } from 'rxjs';
import { Text } from './../../../types/text.types';
import { FirestoreError } from 'firebase/firestore';
import { firestoreErrorCodeToMessageMap } from 'src/app/constants/store.constants';

@Component({
  selector: 'app-send-text',
  templateUrl: './send-text.page.html',
  styleUrls: ['./send-text.page.scss'],
})
export class SendTextPage implements OnInit {
  texts: void | any[] | undefined;
  emptyListMsg = 'You have yet to send any texts to others';
  loadingMsg = 'Loading...';
  isLoading = false;
  errorMsg: string;

  constructor(private shareTextService: ShareTextService) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadTexts().then((texts) => {
      if (texts == null) {
        this.texts = [];
      } else {
        this.texts = texts;
      }
      this.isLoading = false;
    });
    this.errorMsg = '';
  }

  async loadTexts() {
    return await this.shareTextService
      .getTextsSentByUser()
      .catch((err: FirestoreError) => {
        this.errorMsg =
          firestoreErrorCodeToMessageMap.get(err.code) ??
          'There is a problem logging in, please try again later';
      });
  }
}
