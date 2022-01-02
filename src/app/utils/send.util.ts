import { ModalController } from '@ionic/angular';
import { SendComponent } from '../components/send/send.component';

export const createMyCollectionSendModal = (modalCtrl: ModalController) => {
  return modalCtrl.create({
    component: SendComponent,
    swipeToClose: true,
    mode: 'ios',
    componentProps: {
      hasMyCollectionRecipient: false,
    },
  });
};

export const createDefaultSendModal = (modalCtrl: ModalController) => {
  return modalCtrl.create({
    component: SendComponent,
    swipeToClose: true,
    mode: 'ios',
    componentProps: {
      hasMyCollectionRecipient: true,
    },
  });
};
