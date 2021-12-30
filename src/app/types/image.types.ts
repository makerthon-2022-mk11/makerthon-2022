import { UploadData } from './storage.types';

export type ImagePostData = {
  storageRef: string;
  userRef: string;
  title?: string;
  description?: string;
};

export type ImageUploadData = UploadData & {
  title?: string;
  description?: string;
};

export type ImageDataFromDb = {
  storageRef: string;
  title?: string;
  description?: string;
  docRef: string;
};
