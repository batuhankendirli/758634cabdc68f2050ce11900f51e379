import { useContext } from 'react';
import { Context } from '../../Context';
import ProductCard from './ProductCard';
import { IoTrash } from 'react-icons/io5';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ProductCardSkeleton from './ProductCardSkeleton';
import Button from '../Button';

const Products = () => {
  const {
    filteredProducts,
    productsLoading,
    setSearchQuery,
    activePage,
    setActivePage,
  } = useContext(Context);
  const [animationParent] = useAutoAnimate();

  const mappedProducts = filteredProducts[activePage - 1]
    ? filteredProducts[activePage - 1].map((product) => (
        <ProductCard
          key={product.id}
          image={product.image.src}
          price={product.variants[0].price}
          productType={product.product_type}
          productId={product.id}
          title={product.title}
        />
      ))
    : [];

  const handleClearSearchQuery = () => {
    setSearchQuery('');
    setActivePage(1);
  };

  return (
    <div className="products">
      {productsLoading ? (
        <div className="products__wrapper">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      ) : mappedProducts.length ? (
        <div className="products__wrapper" ref={animationParent}>
          {mappedProducts}
        </div>
      ) : (
        <div className="products__empty">
          <h1 className="products__empty-text">
            Oops! No matches found. Try different keywords.
          </h1>
          <Button danger onClick={handleClearSearchQuery}>
            Clear
            <IoTrash className="button-danger-icon" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
