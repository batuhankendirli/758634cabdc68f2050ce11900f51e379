import Skeleton from 'react-loading-skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="product-skeleton">
      <Skeleton className="product-skeleton-img" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton className="product-skeleton-title" />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton className="product-skeleton-price" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
