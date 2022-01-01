import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentSuccessToast(msg: string) {
    return this.presentToast(msg, 'success');
  }

  async presentErrorToast(msg: string) {
    return this.presentToast(msg, 'danger');
  }

  private async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
