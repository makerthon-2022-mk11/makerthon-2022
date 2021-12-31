import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UserSelectData } from 'src/app/types/user.types';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {
  recipients: UserSelectData[];
  filteredRecipients: UserSelectData[];

  constructor(userService: UserService, private modalCtrl: ModalController) {
    userService.getAllOtherUsers().then((users) => {
      this.recipients = users.map((user) => ({ ...user, isSelected: false }));
      this.recipients.sort((firstUser, secondUser) =>
        firstUser.displayName.localeCompare(secondUser.displayName)
      );
      this.filteredRecipients = this.recipients;
    });
  }

  ngOnInit() {}

  filterRecipients(keyword: string) {
    this.filteredRecipients = this.recipients.filter((recipient) =>
      recipient.displayName
        .toLocaleLowerCase()
        .includes(keyword.toLocaleLowerCase())
    );
  }

  toggleRecipientIsSelected(recipient: UserSelectData) {
    recipient.isSelected = !recipient.isSelected;
  }

  send() {
    this.modalCtrl.dismiss(
      this.recipients
        .filter((recipient) => recipient.isSelected)
        .map((recipient) => recipient.docId)
    );
  }
}
