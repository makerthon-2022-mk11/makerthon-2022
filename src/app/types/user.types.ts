export type User = {
  displayName: string;
  email: string;
  uid: string;
  emailVerified: boolean;
};

export type UserPostData = {
  displayName: string;
  email: string;
  uid: string;
};

export type UserDataFromDb = {
  displayName: string;
  email: string;
  uid: string;
  userRef: string;
};
