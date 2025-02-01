import SkeletonCard from './SkeletonCard';

const SkeletonCardList = () => (
  <div className="flex flex-col gap-y-4">
    {[...Array(10)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export default SkeletonCardList;
