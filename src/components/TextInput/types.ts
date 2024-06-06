export interface ITextInput {
    placeholder: string;
    icon?: string;
    size: 'big' | 'small';
    text?: string;
  }

export interface TextInputRef {
    getValue: () => string | undefined;
}