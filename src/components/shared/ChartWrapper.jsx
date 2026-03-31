function ChartWrapper({ title, height = 300, minWidth = 600, children }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 flex flex-col gap-3">
      
      {/* Chart Title */}
      {title && (
        <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
          {title}
        </h3>
      )}

      {/* Scrollable Chart Area */}
      <div className="overflow-x-auto w-full">
        <div
          style={{
            minWidth: `${minWidth}px`,
            height: `${height}px`,
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>

    </div>
  )
}

export default ChartWrapper