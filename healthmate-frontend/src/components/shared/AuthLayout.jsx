import { Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-200/50 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary-100/60 rounded-full blur-2xl"
        />
      </div>

      {/* Decorative dots grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #86efac 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.3 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-display text-2xl font-bold text-gray-900 block leading-none">HealthMate</span>
              <span className="text-xs text-primary-600 font-medium">AI Health Companion</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Card top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-emerald-400 to-primary-600 rounded-t-2xl" />

          {title && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-center"
            >
              <h1 className="font-display text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-400 text-sm mt-1.5">{subtitle}</p>}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Aapka data secure aur private hai
        </p>
      </motion.div>
    </div>
  )
}

export default AuthLayout