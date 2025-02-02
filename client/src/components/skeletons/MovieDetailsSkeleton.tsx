const MovieDetailsSkeleton = () => (
  <div className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-4 p-4 bg-gray-100 rounded-lg shadow-lg animate-pulse">
    <div className="row-span-2 bg-gray-300 rounded-lg"></div>

    <div className="flex flex-col gap-2">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>

    <div className="col-span-2 flex flex-col gap-4">
      <div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      <div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      <div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export default MovieDetailsSkeleton;
