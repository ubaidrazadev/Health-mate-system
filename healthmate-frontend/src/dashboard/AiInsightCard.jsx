import { useState } from 'react'
import { ChevronDown, ChevronUp, Brain, Sparkles, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AiInsightCard = ({ insight }) => {
  const [expanded, setExpanded] = useState(true)
  if (!insight) return null

  const sections = insight.insightText
    ?.split('\n')
    .filter(line => line.trim())
    .map(line => line.trim()) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-primary-200 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-700 hover:to-emerald-700 transition-all duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white flex items-center gap-1.5">
              AI Health Insights
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            </p>
            <p className="text-xs text-primary-200">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          {expanded
            ? <ChevronUp className="w-4 h-4 text-white" />
            : <ChevronDown className="w-4 h-4 text-white" />
          }
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-primary-50/50 to-emerald-50/50"
          >
            <div className="px-5 py-4">
              <div className="bg-white rounded-xl p-4 space-y-2.5 max-h-96 overflow-y-auto border border-primary-100 shadow-sm">
                {sections.map((line, idx) => {
                  const isHeading = /^\d+\./.test(line) || (line.endsWith(':') && line.length < 40)
                  const isDisclaimer = line.toLowerCase().includes('disclaimer') || line.toLowerCase().includes('consult')
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className={`text-sm leading-relaxed ${
                        isHeading
                          ? 'font-bold text-primary-800 mt-4 first:mt-0 border-b border-primary-100 pb-1'
                          : isDisclaimer
                          ? 'text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {line}
                    </motion.p>
                  )
                })}
              </div>

              <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 font-medium">
                  Yeh AI sirf samajhne ke liye hai — ilaaj ke liye hamesha doctor se milen
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AiInsightCard