import {FC} from 'react';
import Button from '../ui/Button';
import {ModalProps} from '../../types/components/ui/modal';
import Close from '../icons/Close';

const Modal: FC<ModalProps> = ({open, onClose, children}) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center
         transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white rounded-lg shadow px-4 pt-12 pb-4 transition-all
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        max-h-[90dvh] overflow-y-auto min-w-[50dvw]`}
      >
        <Button
          variant="neutral"
          className="absolute top-1 right-1 bg-white hover:bg-white hover:scale-95 p-0"
          onClick={onClose}
        >
          <Close size="size-5 sm:size-6 lg:size-7" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
