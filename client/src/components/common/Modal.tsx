import {FC} from 'react';
import Button from '../ui/Button';
import {ModalProps} from '../../types/components/common/modal';

const Modal: FC<ModalProps> = ({open, onClose, children}) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center
         transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white rounded-lg shadow p-4 transition-all
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <Button
          variant="neutral"
          className="absolute top-2 right-2 p-1"
          onClick={onClose}
        >
          x
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
