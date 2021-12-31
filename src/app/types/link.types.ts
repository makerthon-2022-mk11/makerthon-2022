export type LinkDataFromDb = {
  link: string;
  title?: string;
  description?: string;
  docRef: string;
};

export type LinkFormData = {
  link: string;
  title?: string;
  description?: string;
};

export type LinkPostData = LinkFormData & {
  userRef: string;
};
