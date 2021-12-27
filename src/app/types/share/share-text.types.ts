export type ShareTextFormData = {
  docRef: string;
  recipientRef: string;
};

export type ShareTextPostData = ShareTextFormData & {
  senderRef: string;
};
