import { useContext } from 'react';
import { Context } from '../../Context';
import ProductCard from './ProductCard';
import { IoTrash } from 'react-icons/io5';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ProductCardSkeleton from './ProductCardSkeleton';

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
        <div className="products-wrapper">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      ) : mappedProducts.length ? (
        <div className="products-wrapper" ref={animationParent}>
          {mappedProducts}
        </div>
      ) : (
        <div className="products-empty">
          <h1 className="products-empty-text">
            Oops! No matches found. Try different keywords.
          </h1>
          <button
            className="products-empty-btn"
            onClick={handleClearSearchQuery}
          >
            Clear
            <IoTrash className="products-empty-btn-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
