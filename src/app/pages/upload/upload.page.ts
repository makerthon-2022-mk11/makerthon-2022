import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';
import { Validations } from 'src/app/types/form.types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
