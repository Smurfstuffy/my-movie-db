import {MouseEventHandler, ReactNode} from 'react';

export interface ModalProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  children: ReactNode;
}
