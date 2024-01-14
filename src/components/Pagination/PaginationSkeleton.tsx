import Skeleton from 'react-loading-skeleton';

const PaginationSkeleton = () => {
  return (
    <div className="pagination-skeleton">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton className="pagination-skeleton__circle" circle key={i} />
        ))}
    </div>
  );
};

export default PaginationSkeleton;
