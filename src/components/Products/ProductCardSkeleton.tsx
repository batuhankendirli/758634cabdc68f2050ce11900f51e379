import Skeleton from 'react-loading-skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="product-skeleton">
      <Skeleton className="product-skeleton__img" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton className="product-skeleton__title" />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton className="product-skeleton__price" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
