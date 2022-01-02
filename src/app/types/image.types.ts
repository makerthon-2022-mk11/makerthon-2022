import { FieldValue } from '@angular/fire/firestore';
import { UploadData } from './storage.types';

export type ImagePostData = {
  storageRef: string;
  creatorRef: string;
  title?: string;
  description?: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type ImagePutData = {
  title?: string;
  description?: string;
  updatedAt: FieldValue;
};

export type ImageFormData = {
  title?: string;
  description?: string;
};

export type ImageUploadData = UploadData & ImageFormData;

export type ImageStoreData = ImagePostData;

export type ImageData = {
  creatorRef: string;
  storageRef: string;
  title?: string;
  description?: string;
  downloadUrl: string;
  docId: string;
};

export type ImageSelectData = ImageData & {
  isSelected: boolean;
};

export type ImageDeleteData = {
  storageRef: string;
  docId: string;
};
