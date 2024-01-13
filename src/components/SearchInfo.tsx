import { useContext } from 'react';
import { Context } from '../Context';

const SearchInfo = () => {
  const { productType } = useContext(Context);
  const h1Text = productType === 'All' ? 'All Products' : productType;

  return (
    <div className="search-info">
      <span className="search-info-vertical" />
      <h1 className="search-info-title">{h1Text}</h1>
    </div>
  );
};

export default SearchInfo;
