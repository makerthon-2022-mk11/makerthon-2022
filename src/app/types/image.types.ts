import { UploadData } from './storage.types';

export type ImagePostData = {
  fileName?: string;
  storageRef: string;
  userRef: string;
};

export type ImageUploadData = UploadData;
