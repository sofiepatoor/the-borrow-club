export type BaseInputProps = {
  id?: string;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TextInputProps = BaseInputProps & {
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'number';
};

export type TextAreaProps = BaseInputProps & {
  rows?: number;
};

export type SelectProps = BaseInputProps & {
  children: React.ReactNode;
  multiple?: boolean;
};
