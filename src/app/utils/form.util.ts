export const trimInput = (input: string | undefined) => {
  return input ? input.trim() : input;
};

export const isEmpty = (input: string | undefined) => {
  return !input || input.length === 0;
};

export const getUploadButtonText = (isUploading: boolean) => {
  return isUploading ? 'Uploading...' : 'Upload';
};

export const getSaveButtonText = (isSaving: boolean) => {
  return isSaving ? 'Saving...' : 'Save';
};
