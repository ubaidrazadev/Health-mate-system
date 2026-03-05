import { AlertCircle } from 'lucide-react'

const ErrorMessage = ({ message }) => {
  if (!message) return null
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage