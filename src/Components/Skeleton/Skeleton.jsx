const Skeleton = () => {
  return (
    <div
      role="status"
      className="max-w-[175px] w-full flex flex-col gap-[9px] border border-gray-100 rounded-xl p-3 shadow-sm animate-pulse bg-white"
    >
      <div className="rounded-xl bg-gray-200 aspect-square w-full"></div>
      <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
      <div className="h-5 bg-gray-100 rounded-full w-1/2 mt-1"></div>

      <span className="sr-only">Yuklanmoqda...</span>
    </div>
  );
};

export default Skeleton;
