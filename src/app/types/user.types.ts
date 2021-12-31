export type User = {
  displayName: string;
  email: string;
  uid: string;
  emailVerified: boolean;
};

export type UserSendData = {
  displayName: string;
  docId: string;
};

export type UserSelectData = UserSendData & {
  isSelected: boolean;
};

export type UserPostData = {
  displayName: string;
  email: string;
  uid: string;
};
