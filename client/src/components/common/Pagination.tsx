import {FC, useCallback} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '../ui/Button';
import {PaginationProps} from '../../types/components/common/pagination';

const Pagination: FC<PaginationProps> = ({currentPage, totalPages}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = useCallback(
    (page: number) => {
      window.scrollTo({top: 0, behavior: 'auto'});
      const params = new URLSearchParams(location.search);
      params.set('page', page.toString());
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [location, navigate],
  );

  const renderPageNumbers = () => {
    const pagesToShow = [];
    const maxAdjacentPages = 1;

    if (currentPage > maxAdjacentPages + 1) {
      pagesToShow.push(1);
    }

    if (currentPage > maxAdjacentPages + 2) {
      pagesToShow.push('ellipsis-start');
    }

    for (
      let i = Math.max(1, currentPage - maxAdjacentPages);
      i <= Math.min(totalPages, currentPage + maxAdjacentPages);
      i++
    ) {
      pagesToShow.push(i);
    }

    if (currentPage < totalPages - maxAdjacentPages - 1) {
      pagesToShow.push('ellipsis-end');
    }

    if (currentPage < totalPages - maxAdjacentPages) {
      pagesToShow.push(totalPages);
    }

    return pagesToShow.map((page, index) =>
      typeof page === 'number' ? (
        <Button
          key={index}
          variant={currentPage === page ? 'primary' : 'neutral'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ) : (
        <span
          key={index}
          className="hidden sm:flex items-end px-2 py-1 "
          style={{lineHeight: '1'}}
        >
          ...
        </span>
      ),
    );
  };

  return (
    <div className="flex justify-center sm:gap-2 mt-4 mb-4 sm:mb-0">
      <Button
        variant="neutral"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        variant="neutral"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
