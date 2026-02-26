export type BaseInputProps = {
  id?: string;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
};

export type TextInputProps = BaseInputProps & {
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'number';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TextAreaProps = BaseInputProps & {
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type SelectProps = BaseInputProps & {
  children: React.ReactNode;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
