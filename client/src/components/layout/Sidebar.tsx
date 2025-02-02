import Button from '../ui/Button';
import {useNavigate} from 'react-router-dom';
import {FC} from 'react';
import {SideBarProps} from '../../types/components/layout/sidebar';
import SearchBar from '../common/SearchBar';

const Sidebar: FC<SideBarProps> = ({handleOpen}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-4">
      <div className="order-last sm:order-1 xl:hidden self-center">
        <SearchBar />
      </div>
      <Button className="order-last sm:order-1 xl:hidden" onClick={handleOpen}>
        Add Movie
      </Button>
      <Button variant="neutral" onClick={() => navigate('/')}>
        Home
      </Button>
      <Button variant="neutral" onClick={() => navigate('/favourites')}>
        Favourites
      </Button>
    </div>
  );
};

export default Sidebar;
