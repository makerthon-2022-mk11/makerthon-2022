import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {
  @Input()
  validations;

  @Input()
  control: AbstractControl;

  @Input()
  isSubmitted: boolean;

  constructor() {}

  ngOnInit() {}
}
