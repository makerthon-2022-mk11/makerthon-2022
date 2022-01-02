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

export type ImageUploadData = UploadData & {
  title?: string;
  description?: string;
};

export type ImageStoreData = ImagePostData;

export type ImageData = {
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
