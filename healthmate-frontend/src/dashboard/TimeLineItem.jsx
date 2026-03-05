import { FileText, Activity, ExternalLink, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const TimelineItem = ({ item, isLast }) => {
  const isReport = item.type === 'report'
  const date = new Date(item.createdAt).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative flex gap-4 group"
    >
      {/* Line */}
      {!isLast && (
        <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-primary-200 to-transparent" />
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center z-10 shadow-sm mt-1 transition-all duration-200
          ${isReport
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
            : 'bg-gradient-to-br from-emerald-500 to-teal-500'
          }`}
      >
        {isReport
          ? <FileText className="w-4 h-4 text-white" />
          : <Activity className="w-4 h-4 text-white" />
        }
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -1, transition: { duration: 0.15 } }}
        className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-card hover:border-primary-100 transition-all duration-200 mb-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full
            ${isReport
              ? 'bg-blue-50 text-blue-600 border border-blue-100'
              : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            }`}>
            {isReport ? '📄 Medical Report' : '💉 Vital Signs'}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
            <Clock className="w-3 h-3" />
            {date}
          </div>
        </div>

        {/* Content */}
        {isReport ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">File Type:</span>
              <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-lg">
                {item.fileType || 'Medical Report'}
              </span>
            </div>
            {item.fileUrl && (
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Report dekhein
              </a>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {item.bloodPressure && (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-3 py-1.5 rounded-xl">
                <span className="text-red-500 text-sm">❤️</span>
                <div>
                  <p className="text-xs text-red-400 font-medium">BP</p>
                  <p className="text-xs font-bold text-red-700 font-mono">{item.bloodPressure}</p>
                </div>
              </div>
            )}
            {item.sugar && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl">
                <span className="text-amber-500 text-sm">🩸</span>
                <div>
                  <p className="text-xs text-amber-400 font-medium">Sugar</p>
                  <p className="text-xs font-bold text-amber-700 font-mono">{item.sugar} mg/dL</p>
                </div>
              </div>
            )}
            {item.weight && (
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                <span className="text-blue-500 text-sm">⚖️</span>
                <div>
                  <p className="text-xs text-blue-400 font-medium">Weight</p>
                  <p className="text-xs font-bold text-blue-700 font-mono">{item.weight} kg</p>
                </div>
              </div>
            )}
            {item.notes && (
              <p className="w-full text-xs text-gray-500 mt-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                📝 {item.notes}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TimelineItem