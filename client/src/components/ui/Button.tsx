import {FC} from 'react';
import {ButtonProps} from '../../types/components/ui/button';

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'cursor-pointer px-4 py-2 rounded-lg font-medium text-base sm:text-lg md:text-xl transition-all duration-200 active:scale-95';

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'text-white bg-blue-600 hover:bg-blue-700';
      break;
    case 'neutral':
      variantStyles = 'text-slate-700 bg-slate-200 hover:bg-slate-300';
      break;
    case 'primary-outline':
      variantStyles =
        'underline font-normal text-blue-600 bg-white hover:scale-95';
      break;
    case 'edit':
      variantStyles = 'text-white bg-yellow-500 hover:bg-yellow-600';
      break;
    case 'edit-outline':
      variantStyles =
        'underline font-normal text-yellow-500 bg-white hover:scale-95';
      break;
    case 'danger-outline':
      variantStyles =
        'underline font-normal text-red-600 bg-white hover:scale-95';
      break;
    default:
      variantStyles = '';
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
