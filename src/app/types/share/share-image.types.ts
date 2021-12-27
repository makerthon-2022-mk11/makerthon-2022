export type ShareImageUploadData = {
  docRef: string;
  recipientRef: string;
};

export type ShareImagePostData = ShareImageUploadData & {
  senderRef: string;
};
