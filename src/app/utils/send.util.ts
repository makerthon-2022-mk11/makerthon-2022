import { ModalController } from '@ionic/angular';
import { SendComponent } from '../components/send/send.component';

export const createModal = (modalCtrl: ModalController) => {
  return modalCtrl.create({
    component: SendComponent,
    swipeToClose: true,
    mode: 'ios',
  });
};
