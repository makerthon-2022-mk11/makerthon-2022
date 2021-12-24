export type ShareTextFormData = {
  text: string;
  title?: string;
  description?: string;

  recipientRef: string;
};

export type ShareTextPostData = ShareTextFormData & {
  senderRef: string;
};
