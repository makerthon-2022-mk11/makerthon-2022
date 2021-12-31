import { FieldValue } from '@angular/fire/firestore';

export type LinkFormData = {
  link: string;
  title?: string;
  description?: string;
};

export type LinkPostData = LinkFormData & {
  creatorRef: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type LinkData = LinkPostData;
