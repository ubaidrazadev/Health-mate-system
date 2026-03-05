import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { registerApi } from '../../api/authApi'
import Loader from '../shared/Loader'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const errs = {}
    if (!form.username || form.username.length < 3) errs.username = 'Kam az kam 3 characters'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email daalo'
    if (!form.password || form.password.length < 4) errs.password = 'Kam az kam 4 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await registerApi(form)
      toast.success('Account ban gaya! Email check karo 📧')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Registration fail ho gayi')
    } finally {
      setLoading(false)
    }
  }

  const strength = form.password.length === 0 ? 0
    : form.password.length < 4 ? 1
    : form.password.length < 8 ? 2 : 3

  const strengthConfig = {
    0: { width: '0%', color: 'bg-gray-200', label: '' },
    1: { width: '33%', color: 'bg-red-400', label: 'Weak' },
    2: { width: '66%', color: 'bg-yellow-400', label: 'Medium' },
    3: { width: '100%', color: 'bg-primary-500', label: 'Strong' },
  }

  const fields = [
    { name: 'username', label: 'Username', icon: User, placeholder: 'Apna naam daalo', type: 'text' },
    { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'email@example.com', type: 'email' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {fields.map(({ name, label, icon: Icon, placeholder, type }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
          <div className={`relative transition-all duration-200 ${focused === name ? 'scale-[1.01]' : ''}`}>
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === name ? 'text-primary-500' : 'text-gray-300'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused('')}
              placeholder={placeholder}
              className={`input-field pl-11 ${errors[name] ? 'border-red-300 bg-red-50/50' : ''}`}
            />
            {form[name] && !errors[name] && (
              <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
            )}
          </div>
          {errors[name] && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
            >
              ⚠️ {errors[name]}
            </motion.p>
          )}
        </motion.div>
      ))}

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
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
            placeholder="Secure password banao"
            className={`input-field pl-11 pr-12 ${errors.password ? 'border-red-300 bg-red-50/50' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg hover:bg-gray-50"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password strength */}
        {form.password && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 space-y-1"
          >
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: strengthConfig[strength].width }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${strengthConfig[strength].color}`}
              />
            </div>
            <p className="text-xs text-gray-400">
              Password strength: <span className="font-semibold text-gray-600">{strengthConfig[strength].label}</span>
            </p>
          </motion.div>
        )}
        {errors.password && (
          <p className="text-red-500 text-xs mt-1.5">⚠️ {errors.password}</p>
        )}
      </motion.div>

      {/* Terms */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Register karke aap hamare{' '}
        <span className="text-primary-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
        {' '}se agree karte hain
      </p>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <Loader size="sm" /> : <> Account Banao <ArrowRight className="w-4 h-4" /> </>}
      </motion.button>

      <p className="text-center text-sm text-gray-500">
        Pehle se account hai?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-800 font-bold hover:underline">
          Login karo →
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm