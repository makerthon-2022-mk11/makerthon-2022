import { FieldValue } from '@angular/fire/firestore';

export type TextFormData = {
  text: string;
  title?: string;
  description?: string;
};

export type TextPostData = TextFormData & {
  creatorRef: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type TextData = TextPostData;
