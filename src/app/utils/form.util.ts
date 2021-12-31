export const trimInput = (input: string | undefined) => {
  return input ? input.trim() : input;
};

export const isEmpty = (input: string | undefined) => {
  return !input || input.length === 0;
};

export const getUploadButtonText = (isUploading: boolean) => {
  return isUploading ? 'Uploading...' : 'Upload';
};
