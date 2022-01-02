import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validations } from 'src/app/types/form.types';
import { LinkData, LinkFormData } from 'src/app/types/link.types';
import { getSaveButtonText, isEmpty, trimInput } from 'src/app/utils/form.util';

@Component({
  selector: 'app-edit-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input()
  docId: string;

  _editForm: FormGroup;
  _linkData: LinkData;
  isSubmitted: boolean;
  errorMsg: string;
  isUploading: boolean;
  hasSetData: boolean = false;

  validations: Validations = {
    link: [
      { type: 'required', message: 'Link is required' },
      { type: 'pattern', message: 'Empty link is not allowed' },
    ],
  };

  constructor(
    private linkService: LinkService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this._editForm = new FormGroup({
      link: new FormControl(undefined, [
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
    const link = trimInput(this.controls.link.value);
    const title = trimInput(this.controls.title.value);
    const description = trimInput(this.controls.description.value);

    const linkFormData: LinkFormData = {
      link: link,
      title: isEmpty(title) ? undefined : title,
      description: isEmpty(description) ? undefined : description,
    };

    return this.linkService.update(linkFormData, this.docId);
  }

  get linkData() {
    if (this.docId && !this._linkData) {
      this.linkService.get(this.docId).then((data) => (this._linkData = data));
    }
    return this._linkData;
  }

  get editForm() {
    if (this.linkData && !this.hasSetData) {
      this.hasSetData = true;
      this._editForm.controls.link.setValue(this.linkData['link']);
      this._editForm.controls.title.setValue(this.linkData['title']);
      this._editForm.controls.description.setValue(
        this.linkData['description']
      );
    }

    return this._editForm;
  }

  get saveButtonText() {
    return getSaveButtonText(this.isUploading);
  }

  private get controls() {
    return this._editForm.controls;
  }

  private setDefault() {
    this.editForm.reset();
    this._linkData = undefined;
    this.hasSetData = false;
    this.isSubmitted = false;
  }
}
