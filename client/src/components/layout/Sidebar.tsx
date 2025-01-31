import Button from '../ui/Button';
import {useNavigate} from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-1 sm:gap-y-4">
      <Button variant="neutral" className="order-last sm:order-1 xl:hidden">
        Search
      </Button>
      <Button className="order-last sm:order-1 xl:hidden">Add Movie</Button>
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
