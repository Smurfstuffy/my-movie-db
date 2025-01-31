import {FC} from 'react';
import {ButtonProps} from '../../types/components/ui/button';

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'cursor-pointer px-4 py-2 rounded-lg text-white font-medium text-base sm:text-lg md:text-xl transition-all duration-200 active:scale-95';

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 hover:bg-blue-700';
      break;
    case 'neutral':
      variantStyles = 'text-gray-700 bg-slate-200 hover:bg-slate-300';
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
