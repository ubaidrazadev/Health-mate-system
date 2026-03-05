import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { forgotPasswordApi } from '../../api/authApi'
import Loader from '../shared/Loader'

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Email daalo'); return }
    setLoading(true)
    try {
      await forgotPasswordApi(email)
      toast.success('OTP aapki email par bhej diya gaya! 📧')
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kuch gadbad ho gayi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          Email daalo — hum aapko <span className="text-primary-600 font-semibold">6-digit OTP</span> bhejenge
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <div className={`relative transition-all duration-200 ${focused ? 'scale-[1.01]' : ''}`}>
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused ? 'text-primary-500' : 'text-gray-300'}`}>
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="email@example.com"
            className="input-field pl-11"
            autoComplete="email"
          />
        </div>
      </motion.div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60"
      >
        {loading ? <Loader size="sm" /> : <><Send className="w-4 h-4" /> OTP Bhejo <ArrowRight className="w-4 h-4" /></>}
      </motion.button>
    </form>
  )
}

export default ForgotPasswordForm