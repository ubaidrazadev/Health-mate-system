import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { changePasswordApi } from '../../api/authApi'
import Loader from '../shared/Loader'

const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ new: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.newPassword || !form.confirmPassword) { toast.error('Sab fields bharo'); return }
    if (form.newPassword !== form.confirmPassword) { toast.error('Password match nahi kar rahe'); return }
    if (form.newPassword.length < 4) { toast.error('Password kam az kam 4 characters'); return }
    setLoading(true)
    try {
      await changePasswordApi(email, form)
      toast.success('Password change ho gaya! 🎉')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kuch gadbad ho gayi')
    } finally {
      setLoading(false)
    }
  }

  const strength = form.newPassword.length === 0 ? 0
    : form.newPassword.length < 4 ? 1
    : form.newPassword.length < 8 ? 2 : 3

  const strengthConfig = {
    0: { width: '0%', color: 'bg-gray-100', label: '', textColor: 'text-gray-400' },
    1: { width: '33%', color: 'bg-red-400', label: 'Weak 😬', textColor: 'text-red-500' },
    2: { width: '66%', color: 'bg-yellow-400', label: 'Medium 🙂', textColor: 'text-yellow-600' },
    3: { width: '100%', color: 'bg-primary-500', label: 'Strong 💪', textColor: 'text-primary-600' },
  }

  const match = form.confirmPassword && form.newPassword === form.confirmPassword

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <p className="text-xs text-gray-400">Naya password set karo for: <span className="text-primary-600 font-semibold">{email}</span></p>
      </motion.div>

      {/* New Password */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Naya Password</label>
        <div className={`relative transition-all duration-200 ${focused === 'new' ? 'scale-[1.01]' : ''}`}>
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused === 'new' ? 'text-primary-500' : 'text-gray-300'}`}>
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={show.new ? 'text' : 'password'}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            onFocus={() => setFocused('new')}
            onBlur={() => setFocused('')}
            placeholder="Naya secure password"
            className="input-field pl-11 pr-12"
          />
          <button type="button" onClick={() => setShow({ ...show, new: !show.new })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg hover:bg-gray-50">
            {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {form.newPassword && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: strengthConfig[strength].width }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${strengthConfig[strength].color}`}
              />
            </div>
            <p className={`text-xs font-semibold ${strengthConfig[strength].textColor}`}>
              {strengthConfig[strength].label}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Confirm Password */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
        <div className={`relative transition-all duration-200 ${focused === 'confirm' ? 'scale-[1.01]' : ''}`}>
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${focused === 'confirm' ? 'text-primary-500' : 'text-gray-300'}`}>
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={show.confirm ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onFocus={() => setFocused('confirm')}
            onBlur={() => setFocused('')}
            placeholder="Dobara daalo"
            className={`input-field pl-11 pr-12 ${match ? 'border-primary-400 bg-primary-50/30' : ''}`}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {match && <CheckCircle className="w-4 h-4 text-primary-500" />}
            <button type="button" onClick={() => setShow({ ...show, confirm: !show.confirm })}
              className="text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg hover:bg-gray-50">
              {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {match && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary-600 text-xs mt-1.5 font-semibold">
            ✅ Passwords match kar rahe hain!
          </motion.p>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60"
      >
        {loading ? <Loader size="sm" /> : <><ShieldCheck className="w-4 h-4" /> Password Change Karo</>}
      </motion.button>
    </form>
  )
}

export default ChangePasswordForm