import { useContext } from 'react';
import { Context } from '../../Context';
import { PaginationProps } from '../../types/OtherTypes';
import Button from '../Button';

const Pagination = ({ currentPage, totalPage }: PaginationProps) => {
  const { setActivePage } = useContext(Context);

  let pageArr = [1, 2, 3, 4, 5, '\u00B7\u00B7\u00B7', totalPage];

  if (totalPage >= 9 && currentPage >= 5 && currentPage <= totalPage - 4) {
    pageArr = [
      1,
      '\u00B7\u00B7\u00B7',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '\u00B7\u00B7\u00B7',
      totalPage,
    ];
  } else if (totalPage >= 9 && currentPage > totalPage - 4) {
    pageArr = [
      1,
      '\u00B7\u00B7\u00B7',
      totalPage - 4,
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  } else if (totalPage <= 8) {
    pageArr = Array.from(Array(totalPage), (_, i) => i + 1);
  }

  const handlePageClick = (pageNum: string | number, index: number) => {
    if (pageNum !== '\u00B7\u00B7\u00B7') {
      setActivePage(pageNum as number);
    } else {
      if (pageArr.length / 2 > index) {
        setActivePage((pageArr[index + 1] as number) - 1);
      } else {
        setActivePage((pageArr[index - 1] as number) + 1);
      }
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setActivePage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage === totalPage) return;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setActivePage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <Button
        circle
        className={currentPage === 1 ? 'button-circle-disabled' : ''}
        onClick={handlePrevPage}
        title="Previous page"
      >
        <p>&lt;</p>
      </Button>
      {pageArr.map((item, index) => (
        <Button circle key={index} onClick={() => handlePageClick(item, index)}>
          <p
            className={`button-circle-number ${
              currentPage === item ? 'selected' : ''
            }`}
          >
            {item}
          </p>
        </Button>
      ))}
      <Button
        circle
        className={currentPage === totalPage ? 'button-circle-disabled' : ''}
        onClick={handleNextPage}
        title="Next page"
      >
        <p>&gt;</p>
      </Button>
    </div>
  );
};

export default Pagination;
