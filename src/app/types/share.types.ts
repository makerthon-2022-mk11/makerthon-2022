import { FieldValue } from 'firebase/firestore';

export type ShareFormData = {
  itemRef: string;
  recipientRef: string;
};

export type SharePostData = ShareFormData & {
  senderRef: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
