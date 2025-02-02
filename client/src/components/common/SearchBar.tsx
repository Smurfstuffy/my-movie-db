import {useCallback, useState} from 'react';
import Search from '../icons/Search';
import Button from '../ui/Button';
import {useLocation, useNavigate} from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (search) {
      params.set('search', search);
      params.delete('page');
    } else {
      params.delete('search');
    }
    navigate(`/?${params.toString()}`);
  }, [search, location, navigate]);
  return (
    <div className="flex rounded-lg gap-x-2">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="px-4 py-2 rounded-lg text-base sm:text-lg md:text-xl text-slate-700 placeholder-slate-500 bg-white border border-slate-400 w-full"
      />
      <Button
        variant="neutral"
        className="bg-slate-300 hover:bg-slate-400"
        onClick={handleSearch}
      >
        <Search size="size-5 sm:size-6 lg:size-7" />
      </Button>
    </div>
  );
};

export default SearchBar;
