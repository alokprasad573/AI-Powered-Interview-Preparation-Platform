const SkeletonLoader = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-3">
            <div className="h-3 w-20 rounded-full bg-slate-200" />
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
            <div className="h-4 w-1/2 rounded-full bg-slate-200" />
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200" />
        </div>

        <div className="mt-5 space-y-3">
          <div className="h-3 w-full rounded-full bg-slate-200" />
          <div className="h-3 w-full rounded-full bg-slate-200" />
          <div className="h-3 w-5/6 rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-3">
            <div className="h-3 w-20 rounded-full bg-slate-200" />
            <div className="h-4 w-2/3 rounded-full bg-slate-200" />
            <div className="h-4 w-1/3 rounded-full bg-slate-200" />
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200" />
        </div>

        <div className="mt-5 space-y-3">
          <div className="h-3 w-full rounded-full bg-slate-200" />
          <div className="h-3 w-11/12 rounded-full bg-slate-200" />
          <div className="h-3 w-4/5 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
