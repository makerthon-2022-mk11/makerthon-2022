// use: (link, title and description) or (linkRef)??
export type ShareLinkFormData = {
  link: string;
  title?: string;
  description?: string;

  recipientRef: string;
};

export type ShareLinkPostData = ShareLinkFormData & {
  senderRef: string;
};
