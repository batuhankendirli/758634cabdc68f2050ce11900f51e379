import { useContext } from 'react';
import { Context } from '../../Context';
import FilterButton from './FilterButton';
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from 'react-icons/ti';
import Button from '../Button';

const Filters = () => {
  const { products, sortOrder, setSortOrder, setActivePage } =
    useContext(Context);
  const allProductTypes = [
    'All',
    ...new Set(products.map((item) => item.product_type)),
  ];

  const mappedButtons = allProductTypes.map((item) => (
    <FilterButton title={item} key={item} />
  ));

  const sortOptions = {
    unsorted: {
      icon: <TiArrowUnsorted fontSize={'1.3rem'} />,
      next: 'asc',
    },
    asc: {
      icon: <TiArrowSortedUp fontSize={'1.3rem'} />,
      next: 'desc',
    },
    desc: {
      icon: <TiArrowSortedDown fontSize={'1.3rem'} />,
      next: 'unsorted',
    },
  };

  const handleSorting = () => {
    setActivePage(1);
    setSortOrder(sortOptions[sortOrder].next as 'unsorted' | 'asc' | 'desc');
  };

  return (
    <div className="filters">
      <Button primary className="filters__sort" onClick={handleSorting}>
        {sortOptions[sortOrder].icon}
      </Button>
      <span className="filters__vertical" />
      {mappedButtons}
    </div>
  );
};

export default Filters;
