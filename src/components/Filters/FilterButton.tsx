import { useContext } from 'react';
import { Context } from '../../Context';

const FilterButton = ({ title }: { title: string }) => {
  const { productType, setProductType, setActivePage } = useContext(Context);

  const handleFilterClick = () => {
    setProductType(title);
    setActivePage(1);
  };

  return (
    <button
      className={`filter-button ${productType === title ? 'selected' : ''}`}
      disabled={productType === title}
      onClick={handleFilterClick}
    >
      {title}
    </button>
  );
};

export default FilterButton;
