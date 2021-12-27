export type ShareLinkFormData = {
  docRef: string;
  recipientRef: string;
};

export type ShareLinkPostData = ShareLinkFormData & {
  senderRef: string;
};
