function SkeletonCard({ height = 'h-32' }) {
  return (
    <div className={`bg-gray-900 rounded-2xl ${height} animate-pulse`} />
  )
}

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCard height="h-40" />
        <SkeletonCard height="h-40" />
        <SkeletonCard height="h-40" />
      </div>

      {/* Row 2 — 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SkeletonCard height="h-36" />
        <div className="lg:col-span-2">
          <SkeletonCard height="h-36" />
        </div>
      </div>

      {/* Charts */}
      <SkeletonCard height="h-80" />
      <SkeletonCard height="h-80" />
      <SkeletonCard height="h-80" />
    </div>
  )
}

export default SkeletonLoader