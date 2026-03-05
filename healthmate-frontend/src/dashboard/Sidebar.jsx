import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Heart, LayoutDashboard, Upload, Activity,
  Clock, LogOut, Menu, X, ChevronRight, User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', color: 'text-blue-500' },
  { label: 'Report Upload', icon: Upload, href: '/dashboard/upload', color: 'text-purple-500' },
  { label: 'Vitals', icon: Activity, href: '/dashboard/vitals', color: 'text-emerald-500' },
  { label: 'Timeline', icon: Clock, href: '/dashboard/timeline', color: 'text-amber-500' },
]

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logout ho gaye!')
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-4.5 h-4.5 text-white fill-white w-[18px] h-[18px]" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <span className="font-display text-base font-bold text-gray-900">HealthMate</span>
            <p className="text-xs text-gray-400 font-medium">AI Health System</p>
          </div>
        </Link>
      </div>

      {/* User Card */}
      <div className="mx-3 mt-4 mb-2">
        <div className="bg-gradient-to-br from-primary-50 to-emerald-50 border border-primary-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-sm">
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.username}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-600 font-semibold">Active Session</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Menu</p>
        {navItems.map(({ label, icon: Icon, href, color }) => {
          const active = location.pathname === href
          return (
            <motion.div key={href} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? 'bg-gradient-to-r from-primary-600 to-emerald-500 text-white shadow-glow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-primary-50'}`}>
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : color}`} />
                </div>
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-2 border-t border-gray-100 pt-3">
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 text-sm font-medium transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-red-50 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
          Logout
        </motion.button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-gray-100 flex-shrink-0 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 h-14 flex items-center justify-between shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Heart className="w-[14px] h-[14px] text-white fill-white" />
          </div>
          <span className="font-display text-base font-bold text-gray-900">HealthMate</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar