import { UploadData } from '../storage.types';

export type ShareImageUploadData = UploadData & {
  title?: string;
  description?: string;

  recipientRef: string;
};

export type ShareImagePostData = {
  storageRef: string;
  title?: string;
  description?: string;

  senderRef: string;
  recipientRef: string;
};
