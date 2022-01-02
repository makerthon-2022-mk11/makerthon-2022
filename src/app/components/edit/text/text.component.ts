import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { TextData, TextFormData } from 'src/app/types/text.types';
import { getSaveButtonText, isEmpty, trimInput } from 'src/app/utils/form.util';

@Component({
  selector: 'app-edit-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input()
  docId: string;

  _editForm: FormGroup;
  _textData: TextData;
  isSubmitted: boolean;
  errorMsg: string;
  isUploading: boolean;
  hasLoaded: boolean;
  hasSetData: boolean = false;

  validations: Validations = {
    text: [
      { type: 'required', message: 'Text is required' },
      { type: 'pattern', message: 'Empty text is not allowed' },
    ],
  };

  constructor(
    private textService: TextService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this._editForm = new FormGroup({
      text: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ]),
      title: new FormControl(undefined),
      description: new FormControl(undefined),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.editForm.valid) {
      this.errorMsg = '';
      this.isUploading = true;
    }

    this.upload()
      .then(() => {
        this.toastService.presentSuccessToast(
          'Successfully saved your changes'
        );
        this.setDefault();
      })
      .catch(() => {
        this.errorMsg =
          'There was an error saving your changes. Please try again later';
      })
      .finally(() => {
        this.isUploading = false;
      });
  }

  upload() {
    const text = trimInput(this.controls.text.value);
    const title = trimInput(this.controls.title.value);
    const description = trimInput(this.controls.description.value);

    const textFormData: TextFormData = {
      text: text,
      title: isEmpty(title) ? undefined : title,
      description: isEmpty(description) ? undefined : description,
    };

    return this.textService.update(textFormData, this.docId);
  }

  get saveButtonText() {
    return getSaveButtonText(this.isUploading);
  }

  get textData() {
    if (this.docId && !this.hasLoaded) {
      this.hasLoaded = true;
      this.textService.get(this.docId).then((data) => (this._textData = data));
    }
    return this._textData;
  }

  get editForm() {
    if (this.textData && !this.hasSetData) {
      this.hasSetData = true;
      this._editForm.controls.text.setValue(this.textData['text']);
      this._editForm.controls.title.setValue(this.textData['title']);
      this._editForm.controls.description.setValue(
        this.textData['description']
      );
    }

    return this._editForm;
  }

  private get controls() {
    return this._editForm.controls;
  }

  private setDefault() {
    this.editForm.reset();
    this.hasLoaded = false;
    this.hasSetData = false;
    this.isSubmitted = false;
  }
}
