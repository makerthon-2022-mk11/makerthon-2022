export type TextDataFromDb = {
  text: string;
  title?: string;
  description?: string;
  docRef: string;
};

export type TextFormData = {
  text: string;
  title?: string;
  description?: string;
};

export type TextPostData = TextFormData & {
  userRef: string;
};

export type TextData = TextPostData;
