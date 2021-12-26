import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

const expandEnter = trigger('expand', [
  transition(':enter', [
    style({ minHeight: 0, height: 0, width: 0 }),
    animate('300ms', style({ height: '80vh', width: '90vw' })),
  ]),
]);

const float = trigger('float', [
  state('up', style({ transform: 'translateY(-20%)' })),
  state('down', style({ transform: 'translateY(0%)' })),
  transition('* <=> *', [animate(500)]),
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [expandEnter, float],
})
export class HomePage implements OnInit {
  machineImages: HTMLImageElement[];
  machineUrl: string;
  baseUrl: string;
  knobUrl: string;
  ballUrl: string;
  addButtonUrl: string;
  isShowingMessage: boolean;
  addButtonState: 'up' | 'down';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initializeMachineImages();
    this.machineUrl = this.machineImages[0].src;
    this.baseUrl = '../../../assets/images/gacha/base.png';
    this.knobUrl = '../../../assets/images/gacha/knob.png';
    this.ballUrl = '../../../assets/images/gacha/gacha-balls/1.png';
    this.addButtonUrl = '../../assets/images/gacha/add-button.png';
    this.isShowingMessage = false;
    this.addButtonState = 'down';
  }

  get displayName(): string {
    return this.userService.user?.displayName;
  }

  onClickKnob() {
    if (!this.isShowingMessage) {
      this.animateMachine();
    }
  }

  animateMachine(index: number = 0) {
    this.machineUrl = this.machineImages[index].src;
    setTimeout(() => {
      if (index < this.machineImages.length - 1) {
        this.animateMachine(index + 1);
      } else {
        this.machineUrl = this.machineImages[0].src;
        this.isShowingMessage = true;
      }
    }, 200);
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

  hideMessage() {
    this.isShowingMessage = false;
  }

  toggleAddButtonState() {
    this.addButtonState = this.addButtonState === 'down' ? 'up' : 'down';
  }
}
