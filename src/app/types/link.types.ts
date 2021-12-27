export type LinkFormData = {
  link: string;
  title?: string;
  description?: string;
};

export type LinkPostData = LinkFormData & {
  userRef: string;
};

export type LinkData = LinkPostData;
