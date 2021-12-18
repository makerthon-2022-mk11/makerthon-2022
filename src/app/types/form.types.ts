type ValidationType = 'required' | 'pattern' | 'minlength' | 'notSame';

type Validation = {
  type: ValidationType;
  message: string;
};

export interface Validations {
  [key: string]: Validation[];
}
