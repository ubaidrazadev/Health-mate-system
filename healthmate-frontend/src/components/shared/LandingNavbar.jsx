import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const LandingNavbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-primary-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-4.5 h-4.5 text-white fill-white w-[18px] h-[18px]" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-gray-900">HealthMate</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'How it Works'].map((item) => (
              <a
                key={item}
                href={`#${item === 'Features' ? 'features' : 'how'}`}
                className="btn-ghost text-sm"
              >
                {item}
              </a>
            ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-sm py-2 px-5"
            >
              Dashboard
            </motion.button>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">Login</Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/register" className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-primary-50 text-primary-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-primary-100 px-6 py-4 flex flex-col gap-2 overflow-hidden"
          >
            <a href="#features" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>Features</a>
            <a href="#how" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>How it Works</a>
            <div className="border-t border-gray-100 pt-2 mt-1 flex flex-col gap-2">
              <Link to="/login" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default LandingNavbar