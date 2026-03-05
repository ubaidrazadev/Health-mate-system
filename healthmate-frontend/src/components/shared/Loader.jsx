const Loader = ({ fullScreen = false, size = 'md' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-primary-700 font-display text-lg">HealthMate</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`} />
      {size !== 'sm' && (
        <p className="text-primary-600 text-sm font-medium tracking-wide">Loading...</p>
      )}
    </div>
  )
}

export default Loader