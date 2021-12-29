export type Text = {
  text: string;
  title?: string;
  description?: string;
};

export type TextFormData = {
  text: string;
  title?: string;
  description?: string;
};

export type TextPostData = TextFormData & {
  userRef: string;
};
