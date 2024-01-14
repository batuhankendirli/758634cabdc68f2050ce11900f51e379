import Skeleton from 'react-loading-skeleton';

const FiltersSkeleton = () => {
  return (
    <div className="filters-skeleton">
      <Skeleton className="filters-skeleton__circle" />
      <span className="filters-vertical" />
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Skeleton className="filters-skeleton__btn" key={i} />
        ))}
    </div>
  );
};

export default FiltersSkeleton;
