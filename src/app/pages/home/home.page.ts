import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';
import { ImageService } from 'src/app/services/image.service';
import { LinkService } from 'src/app/services/link.service';
import { TextService } from 'src/app/services/text.service';
import { UserService } from 'src/app/services/user.service';
import {
  AddButtonStateEnum,
  BoosterTypeEnum,
} from 'src/app/types/gachapon.types';
import { ImageData } from 'src/app/types/image.types';
import { LinkData } from 'src/app/types/link.types';
import { TextData } from 'src/app/types/text.types';
import { getRandomInt } from 'src/app/utils/random.util';

const expandEnter = trigger('expand', [
  transition(':enter', [
    style({ minHeight: 0, height: 0, width: 0 }),
    animate('300ms', style({ height: '80vh', width: '90vw' })),
  ]),
]);

const float = trigger('float', [
  state(AddButtonStateEnum.Up, style({ transform: 'translateY(-20%)' })),
  state(AddButtonStateEnum.Down, style({ transform: 'translateY(0%)' })),
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
  isShowingBooster: boolean;
  addButtonState: AddButtonStateEnum;
  booster: BoosterTypeEnum;
  imageData: ImageData;
  linkData: LinkData;
  textData: TextData;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private linkService: LinkService,
    private textService: TextService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeMachineImages();
    this.machineUrl = this.machineImages[0].src;
    this.baseUrl = '../../../assets/images/gacha/base.png';
    this.knobUrl = '../../../assets/images/gacha/knob.png';
    this.addButtonUrl = '../../assets/images/gacha/add-button.png';
    this.isShowingBooster = false;
    this.addButtonState = AddButtonStateEnum.Down;
  }

  get displayName(): string {
    return this.userService.user?.displayName;
  }

  onClickKnob() {
    if (!this.isShowingBooster) {
      this.setRandomBall();
      this.animateMachine();
      this.getRandomBooster();
    }
  }

  animateMachine(index: number = 0) {
    this.machineUrl = this.machineImages[index].src;
    setTimeout(() => {
      if (index < this.machineImages.length - 1) {
        this.animateMachine(index + 1);
      } else {
        this.machineUrl = this.machineImages[0].src;
        this.isShowingBooster = true;
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

  hideBooster() {
    this.isShowingBooster = false;
  }

  toggleAddButtonState() {
    this.addButtonState =
      this.addButtonState === AddButtonStateEnum.Down
        ? AddButtonStateEnum.Up
        : AddButtonStateEnum.Down;
  }

  setRandomBall() {
    const ballId = getRandomInt(4);
    this.ballUrl = `../../../assets/images/gacha/gacha-balls/${ballId}.png`;
  }

  getRandomBooster() {
    const collection = getRandomInt(3);
    switch (collection) {
      case 0:
        this.booster = BoosterTypeEnum.Image;
        this.imageService.getRandom().then((data) => (this.imageData = data));
        break;
      case 1:
        this.booster = BoosterTypeEnum.Link;
        this.linkService.getRandom().then((data) => (this.linkData = data));
        break;
      case 2:
        this.booster = BoosterTypeEnum.Text;
        this.textService.getRandom().then((data) => {
          this.textData = data;
        });
        break;
      default:
        break;
    }
  }

  isBoosterImage() {
    return this.booster === BoosterTypeEnum.Image;
  }

  isBoosterLink() {
    return this.booster == BoosterTypeEnum.Link;
  }

  isBoosterText() {
    return this.booster === BoosterTypeEnum.Text;
  }

  navToUpload() {
    this.router.navigateByUrl(routePaths.UPLOAD);
  }
}
