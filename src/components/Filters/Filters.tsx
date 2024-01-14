import { useContext } from 'react';
import { Context } from '../../Context';
import FilterButton from './FilterButton';
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from 'react-icons/ti';

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
      icon: <TiArrowUnsorted />,
      next: 'asc',
    },
    asc: {
      icon: <TiArrowSortedUp />,
      next: 'desc',
    },
    desc: {
      icon: <TiArrowSortedDown />,
      next: 'unsorted',
    },
  };

  const handleSorting = () => {
    setActivePage(1);
    setSortOrder(sortOptions[sortOrder].next as 'unsorted' | 'asc' | 'desc');
  };

  return (
    <div className="filters">
      <button className="filters__sort" onClick={handleSorting}>
        {sortOptions[sortOrder].icon}
      </button>
      <span className="filters__vertical" />
      {mappedButtons}
    </div>
  );
};

export default Filters;
