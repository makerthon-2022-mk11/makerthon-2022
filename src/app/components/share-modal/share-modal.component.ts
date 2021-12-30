import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShareImageService } from 'src/app/services/share/share-image.service';
import { ShareLinkService } from 'src/app/services/share/share-link.service';
import { ShareTextService } from 'src/app/services/share/share-text.service';
import { UserService } from 'src/app/services/user.service';
import { ShareImageUploadData } from 'src/app/types/share/share-image.types';
import { ShareLinkFormData } from 'src/app/types/share/share-link.types';
import { ShareTextFormData } from 'src/app/types/share/share-text.types';
import { UserDataFromDb } from 'src/app/types/user.types';

@Component({
  selector: 'app-share-modal',
  templateUrl: 'share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent implements OnInit {
  @Input() docRefDataToSend;
  users: any[];
  filteredUsers: any[];
  selectedUser: string; // docId of user

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private shareTextService: ShareTextService,
    private shareImageService: ShareImageService,
    private shareLinkService: ShareLinkService
  ) {}

  ngOnInit() {
    this.userService.getAllOtherUsers().then((usersData) => {
      this.users = usersData;
      this.filteredUsers = usersData;
    });
  }

  filterUsers(substring: string) {
    this.filteredUsers = this.users.filter(
      (s) => s.displayName.includes(substring) || s.email.includes(substring)
    );
  }

  isSelected(userData: UserDataFromDb) {
    return this.selectedUser == userData.userRef;
  }

  onSelect(userData: UserDataFromDb) {
    this.selectedUser = userData.userRef;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onSend() {
    const recipientRef = this.selectedUser;
    const postTextDataRef = [];
    const postImageDataRef = [];
    const postLinkDataRef = [];

    this.docRefDataToSend.forEach((doc) => {
      if (doc.text != undefined) {
        postTextDataRef.push(doc.docRef);
      }
      if (doc.storageRef != undefined) {
        postImageDataRef.push(doc.docRef);
      }
      if (doc.link != undefined) {
        postLinkDataRef.push(doc.docRef);
      }
    });

    postTextDataRef.forEach((docRef) => {
      const shareTextFormData: ShareTextFormData = {
        docRef: docRef,
        recipientRef: recipientRef,
      };
      this.shareTextService.create(shareTextFormData);
    });

    postImageDataRef.forEach((docRef) => {
      const shareImageFormData: ShareImageUploadData = {
        docRef: docRef,
        recipientRef: recipientRef,
      };
      this.shareImageService.create(shareImageFormData);
    });

    // postLinkDataRef.forEach((docRef) => {
    //   const shareLinkFormData: ShareLinkFormData = {
    //     docRef: docRef,
    //     recipientRef: recipientRef,
    //   }
    //   this.shareLinkService.create(shareLinkFormData);
    // })

    this.dismissModal();
  }
}
