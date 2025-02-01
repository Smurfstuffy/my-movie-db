const SkeletonCard = () => (
  <div className="grid grid-cols-[2fr_4fr_1fr] gap-4 bg-white rounded-lg animate-pulse">
    <div className="rounded-l-lg bg-slate-300 w-full h-40 sm:h-48 md:h-56"></div>

    <div className="flex flex-col gap-2 mt-2 md:mt-4">
      <div className="h-6 sm:h-8 md:h-10 bg-slate-300 rounded w-3/4"></div>
      <div className="h-4 sm:h-5 md:h-6 bg-slate-300 rounded w-1/2"></div>
      <div className="h-12 sm:h-16 md:h-20 bg-slate-300 rounded w-full"></div>
    </div>
  </div>
);

export default SkeletonCard;
