import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImageData, ImageFormData } from 'src/app/types/image.types';
import { getSaveButtonText, isEmpty, trimInput } from 'src/app/utils/form.util';

@Component({
  selector: 'app-edit-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input()
  docId: string;

  _editForm: FormGroup;
  _imageData: ImageData;
  isSubmitted: boolean;
  errorMsg: string;
  isUploading: boolean;
  hasLoaded: boolean = false;
  hasSetData: boolean = false;

  constructor(
    private imageService: ImageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this._editForm = new FormGroup({
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
    const title = trimInput(this.controls.title.value);
    const description = trimInput(this.controls.description.value);

    const imageFormData: ImageFormData = {
      title: isEmpty(title) ? undefined : title,
      description: isEmpty(description) ? undefined : description,
    };

    return this.imageService.update(imageFormData, this.docId);
  }

  get imageData() {
    if (this.docId && !this.hasLoaded) {
      this.hasLoaded = true;
      this.imageService
        .get(this.docId)
        .then((data) => (this._imageData = data));
    }
    return this._imageData;
  }

  get editForm() {
    if (this.imageData && !this.hasSetData) {
      this.hasSetData = true;
      this._editForm.controls.title.setValue(this.imageData['title']);
      this._editForm.controls.description.setValue(
        this.imageData['description']
      );
    }

    return this._editForm;
  }

  get saveButtonText() {
    return getSaveButtonText(this.isUploading);
  }

  hasDownloadUrl() {
    return this.imageData?.downloadUrl;
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
