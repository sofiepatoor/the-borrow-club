export type BaseInputProps = {
  id?: string;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
};

export type TextInputProps = BaseInputProps & {
  type?: 'text' | 'email' | 'password' | 'search' | 'url';
  placeholder?: string;
  defaultValue?: string;
};

export type TextAreaProps = BaseInputProps & {
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
};
