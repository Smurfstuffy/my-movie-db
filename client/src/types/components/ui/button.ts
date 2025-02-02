import {ButtonHTMLAttributes} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'neutral'
    | 'primary-outline'
    | 'danger-outline'
    | 'edit-outline';
}
