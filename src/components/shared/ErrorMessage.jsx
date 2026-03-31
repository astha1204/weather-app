function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-400 font-semibold text-lg">Error</p>
      <p className="text-gray-400 text-sm text-center max-w-md">{message}</p>
    </div>
  )
}

export default ErrorMessage