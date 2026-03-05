import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { loginApi } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'
import Loader from '../shared/Loader'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Sab fields bharo'); return }
    setLoading(true)
    try {
      const res = await loginApi(form)
      const { accesToken, refreshToken, user } = res.data
      login(accesToken, refreshToken, user)
      toast.success(`Welcome back, ${user.username}! 👋`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login fail ho gayi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className={`relative transition-all duration-200 ${focused === 'email' ? 'scale-[1.01]' : ''}`}>
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${focused === 'email' ? 'text-primary-500' : 'text-gray-300'}`}>
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
            placeholder="email@example.com"
            className="input-field pl-11"
            autoComplete="email"
          />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <Link to="/forgot-password"
            className="text-xs text-primary-600 hover:text-primary-800 font-semibold hover:underline transition-colors">
            Password bhool gaye?
          </Link>
        </div>
        <div className={`relative transition-all duration-200 ${focused === 'password' ? 'scale-[1.01]' : ''}`}>
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === 'password' ? 'text-primary-500' : 'text-gray-300'}`}>
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
            placeholder="••••••••"
            className="input-field pl-11 pr-12"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg hover:bg-gray-50"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <Loader size="sm" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Login Karo
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Divider */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400">ya phir</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500">
        Account nahi hai?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-800 font-bold hover:underline transition-colors">
          Register karo →
        </Link>
      </p>
    </form>
  )
}

export default LoginForm