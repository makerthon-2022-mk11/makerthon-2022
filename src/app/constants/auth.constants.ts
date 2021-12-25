export const authErrorCodes = {
  EMAIL_EXISTS: 'auth/email-already-in-use',
  EMAIL_PASSWORD_ACCOUNTS_DISABLED: 'auth/operation-not-allowed',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WEAK_PASSWORD: 'auth/weak-password',
  WRONG_PASSWORD: 'auth/wrong-password',
};

export const authErrorCodeToMessageMap = new Map([
  [
    authErrorCodes.EMAIL_EXISTS,
    'This email is already associated with an account. Try logging in instead.',
  ],
  [
    authErrorCodes.EMAIL_PASSWORD_ACCOUNTS_DISABLED,
    'Email/Password accounts are not enabled.',
  ],
  [authErrorCodes.USER_DISABLED, 'This account has been disabled'],
  [authErrorCodes.USER_NOT_FOUND, 'This user is not found'],
  [
    authErrorCodes.WEAK_PASSWORD,
    'Password should be at least 6 characters long.',
  ],
  [authErrorCodes.WRONG_PASSWORD, 'The password is incorrect'],
]);
