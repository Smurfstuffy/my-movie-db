import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Button from '../ui/Button';

const Layout = () => (
  <div className="grid sm:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_3fr_1fr] gap-4 sm:py-4 px-4 md:px-12 lg:px-32 xl:px-40">
    <aside>
      <Sidebar />
    </aside>
    <main className="bg-white rounded-lg p-4">
      <Outlet />
    </main>
    <aside className="hidden xl:flex xl:flex-col xl:gap-y-4">
      <Button variant="neutral">Search</Button>
      <Button>Add Movie</Button>
    </aside>
  </div>
);

export default Layout;
