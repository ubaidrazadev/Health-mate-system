import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, Activity, Clock, Upload,
  ArrowRight, Heart, TrendingUp, Zap, Plus
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { getTimelineApi } from '../../api/reportApi'
import Loader from '../../components/shared/Loader'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const DashboardHome = () => {
  const { user } = useAuth()
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTimelineApi()
      .then(res => setTimeline(res.data.timeline || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const reports = timeline.filter(i => i.type === 'report')
  const vitals = timeline.filter(i => i.type === 'vital')
  const recent = timeline.slice(0, 5)

  const greet = () => {
    const h = new Date().getHours()
    if (h < 12) return { text: 'Subah Bakhair', emoji: '🌅' }
    if (h < 17) return { text: 'Assalam o Alaikum', emoji: '☀️' }
    return { text: 'Shaam Bakhair', emoji: '🌙' }
  }

  const { text: greetText, emoji: greetEmoji } = greet()

  const stats = [
    {
      label: 'Reports',
      value: reports.length,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      to: '/dashboard/upload',
      desc: 'Medical reports'
    },
    {
      label: 'Vitals',
      value: vitals.length,
      icon: Activity,
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      to: '/dashboard/vitals',
      desc: 'Health entries'
    },
    {
      label: 'Timeline',
      value: timeline.length,
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      to: '/dashboard/timeline',
      desc: 'Total events'
    },
  ]

  return (
    <div className="space-y-6 w-full">

      {/* Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-700 rounded-3xl p-6 text-white overflow-hidden"
      >
        {/* BG decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-400/10 rounded-full translate-y-1/2" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 right-16 w-16 h-16 border border-white/10 rounded-full"
          />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm font-medium mb-1">{greetEmoji} {greetText}</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              {user?.username}! 👋
            </h1>
            <p className="text-primary-200 text-sm">
              Aaj apni sehat ka khyal rakho — AI aapke saath hai
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold">
                <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                AI Ready
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold">
                <Zap className="w-3 h-3" />
                Gemini 2.5
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Heart className="w-8 h-8 text-white fill-white/80" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader /></div>
      ) : (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map(({ label, value, icon: Icon, bg, text, to, desc, color }) => (
            <motion.div key={label} variants={fadeUp}>
              <Link to={to}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="stat-card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${text}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 font-display mb-1">{value}</p>
                  <p className="text-sm font-semibold text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              to: '/dashboard/upload',
              icon: Upload,
              iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
              title: 'Report Upload Karo',
              desc: 'AI instant analysis karega',
              border: 'border-blue-100 hover:border-blue-300',
              bg: 'hover:bg-blue-50/50'
            },
            {
              to: '/dashboard/vitals',
              icon: Plus,
              iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
              title: 'Vitals Add Karo',
              desc: 'BP, sugar, weight record karo',
              border: 'border-emerald-100 hover:border-emerald-300',
              bg: 'hover:bg-emerald-50/50'
            }
          ].map(({ to, icon: Icon, iconBg, title, desc, border, bg }) => (
            <Link key={to} to={to}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 bg-white border-2 ${border} ${bg} rounded-2xl p-5 transition-all duration-200 group shadow-sm`}
              >
                <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-gray-900">Recent Activity</h2>
          <Link to="/dashboard/timeline"
            className="flex items-center gap-1 text-primary-600 text-sm font-semibold hover:text-primary-800 transition-colors">
            Sab dekho <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? <Loader /> : recent.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-sm">Koi activity nahi abhi</p>
            <p className="text-gray-400 text-xs mt-1">Report ya vitals add karo</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-primary-100 hover:shadow-sm transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  ${item.type === 'report' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
                  {item.type === 'report'
                    ? <FileText className="w-4 h-4 text-blue-500" />
                    : <Activity className="w-4 h-4 text-emerald-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.type === 'report' ? '📄 Report uploaded' : '💉 Vitals recorded'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString('en-PK', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0
                  ${item.type === 'report' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {item.type}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default DashboardHome