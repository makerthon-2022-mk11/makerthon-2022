export const firestoreErrorCodes = {
  UNKNOWN: 'unknown',
  NOT_FOUND: 'not_found',
  ALREADY_EXISTS: 'already_exists',
  PERMISSION_DENIED: 'permission_denied',
};

export const firestoreErrorCodeToMessageMap = new Map([
  [firestoreErrorCodes.UNKNOWN, 'Encountered an unknown error'],
  [firestoreErrorCodes.NOT_FOUND, 'Document(s) not found in database'],
  [
    firestoreErrorCodes.ALREADY_EXISTS,
    'Document creation failed. Document already exists',
  ],
  [
    firestoreErrorCodes.PERMISSION_DENIED,
    'User does not have access to execute this function',
  ],
]);
