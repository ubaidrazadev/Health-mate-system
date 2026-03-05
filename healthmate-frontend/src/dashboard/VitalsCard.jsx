import { Heart, Activity, StickyNote, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const VitalsCard = ({ vital }) => {
  const date = new Date(vital.entryDate || vital.createdAt).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  const metrics = [
    vital.bloodPressure && {
      icon: '❤️', label: 'Blood Pressure', value: vital.bloodPressure, unit: '',
      bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', sub: 'text-red-400'
    },
    vital.sugar && {
      icon: '🩸', label: 'Blood Sugar', value: vital.sugar, unit: 'mg/dL',
      bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', sub: 'text-amber-400'
    },
    vital.weight && {
      icon: '⚖️', label: 'Weight', value: vital.weight, unit: 'kg',
      bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', sub: 'text-blue-400'
    },
  ].filter(Boolean)

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-primary-500 to-teal-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Vital Entry</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
          <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        {/* Metrics */}
        <div className={`grid gap-2.5 ${metrics.length === 1 ? 'grid-cols-1' : metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {metrics.map(({ icon, label, value, unit, bg, border, text, sub }) => (
            <div key={label} className={`${bg} border ${border} rounded-xl p-3 text-center`}>
              <span className="text-lg">{icon}</span>
              <p className={`text-xs ${sub} font-medium mt-1`}>{label.split(' ')[0]}</p>
              <p className={`font-bold ${text} text-sm font-mono mt-0.5`}>
                {value}{unit && <span className="text-xs font-normal ml-0.5">{unit}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {vital.notes && (
          <div className="mt-3 flex items-start gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <StickyNote className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">{vital.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default VitalsCard