import { ModalController } from '@ionic/angular';
import { SendComponent } from '../components/send/send.component';

export const createSendModal = (modalCtrl: ModalController) => {
  return modalCtrl.create({
    component: SendComponent,
    swipeToClose: true,
    mode: 'ios',
  });
};
