import { useContext } from 'react';
import { Context } from '../../Context';
import Button from '../Button';

const FilterButton = ({ title }: { title: string }) => {
  const { productType, setProductType, setActivePage } = useContext(Context);

  const handleFilterClick = () => {
    setProductType(title);
    setActivePage(1);
  };

  return (
    <Button
      primary
      big
      selected={productType === title}
      onClick={handleFilterClick}
    >
      {title}
    </Button>
  );
};

export default FilterButton;
