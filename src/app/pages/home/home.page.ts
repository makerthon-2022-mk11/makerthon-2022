import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  machineImages: HTMLImageElement[];
  machineUrl: string;
  baseUrl: string;
  knobUrl: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initializeMachineImages();
    this.machineUrl = this.machineImages[0].src;
    this.baseUrl = '../../../assets/images/gacha/base.png';
    this.knobUrl = '../../../assets/images/gacha/knob.png';
  }

  get displayName(): string {
    return this.userService.user?.displayName;
  }

  animateMachine(index: number = 0) {
    this.machineUrl = this.machineImages[index].src;
    setTimeout(() => {
      if (index < this.machineImages.length - 1) {
        this.animateMachine(index + 1);
      } else {
        this.machineUrl = this.machineImages[0].src;
      }
    }, 300);
  }

  // Preload images so that transition will be smooth
  initializeMachineImages() {
    const numImages = 10;
    this.machineImages = new Array(10);
    for (let i = 0; i < numImages; i++) {
      this.machineImages[i] = new Image();
      this.machineImages[
        i
      ].src = `../../../assets/images/gacha/gacha-machine/${i}.png`;
    }
  }
}
