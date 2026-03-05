import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { verifyOtpApi } from '../../api/authApi'
import Loader from '../shared/Loader'

const OtpForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const inputs = useRef([])

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otp]
    newOtp[idx] = val.slice(-1)
    setOtp(newOtp)
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus()
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpStr = otp.join('')
    if (otpStr.length < 6) { toast.error('6-digit OTP poora daalo'); return }
    setLoading(true)
    try {
      await verifyOtpApi(email, otpStr)
      toast.success('OTP verify ho gaya! ✅')
      navigate(`/change-password?email=${encodeURIComponent(email)}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Galat OTP')
      setOtp(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const filled = otp.filter(d => d).length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="relative inline-flex mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-glow">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-sm">
            {filled}
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          OTP bheja gaya:{' '}
          <span className="text-primary-700 font-bold">{email}</span>
        </p>
      </motion.div>

      {/* OTP boxes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2.5 justify-center"
        onPaste={handlePaste}
      >
        {otp.map((digit, idx) => (
          <motion.input
            key={idx}
            ref={(el) => (inputs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            whileFocus={{ scale: 1.08 }}
            className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200 outline-none font-mono
              ${digit
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-glow-sm'
                : 'border-gray-200 bg-white text-gray-800'
              }
              focus:border-primary-500 focus:bg-primary-50/50 focus:shadow-glow-sm`}
          />
        ))}
      </motion.div>

      {/* Progress indicator */}
      <div className="flex gap-1.5 justify-center">
        {otp.map((d, i) => (
          <motion.div
            key={i}
            animate={{ scale: d ? 1.2 : 1 }}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${d ? 'bg-primary-500' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      <motion.button
        type="submit"
        disabled={loading || filled < 6}
        whileHover={{ scale: (loading || filled < 6) ? 1 : 1.02 }}
        whileTap={{ scale: (loading || filled < 6) ? 1 : 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader size="sm" /> : <><ShieldCheck className="w-4 h-4" /> OTP Verify Karo</>}
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <RefreshCw className="w-3.5 h-3.5" />
        <span>OTP nahi mili? <button type="button" className="text-primary-600 font-semibold hover:underline">Resend karo</button></span>
      </div>
    </form>
  )
}

export default OtpForm