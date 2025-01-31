import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Button from '../ui/Button';
import Modal from '../common/Modal';
import {useState, useCallback} from 'react';
import Form from '../common/Form';

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="grid sm:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_3fr_1fr] gap-4 sm:py-4 px-4 md:px-12 lg:px-32 xl:px-40">
      <aside>
        <Sidebar handleOpen={handleOpen} />
      </aside>
      <main className="bg-white rounded-lg p-4">
        <Outlet />
        <Modal open={open} onClose={handleClose}>
          <Form handleClose={handleClose} />
        </Modal>
      </main>
      <aside className="hidden xl:flex xl:flex-col xl:gap-y-4">
        <Button variant="neutral">Search</Button>
        <Button onClick={handleOpen}>Add Movie</Button>
      </aside>
    </div>
  );
};

export default Layout;
