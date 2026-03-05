import { useState } from 'react'
import { Activity, Heart, FileText, Calendar, CheckCircle, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { addVitalsApi } from '../api/reportApi'
import Loader from '../components/shared/Loader'

const VitalsForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    bloodPressure: '', sugar: '', weight: '', notes: '',
    entryDate: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.bloodPressure && !form.sugar && !form.weight) {
      toast.error('Kam az kam ek vital daalo')
      return
    }
    setLoading(true)
    try {
      await addVitalsApi(form)
      toast.success('Vitals save ho gaye! ✅')
      setDone(true)
      setForm({ bloodPressure: '', sugar: '', weight: '', notes: '', entryDate: new Date().toISOString().split('T')[0] })
      onSuccess?.()
      setTimeout(() => setDone(false), 3000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save fail ho gayi')
    } finally {
      setLoading(false)
    }
  }

  const vitalFields = [
    {
      name: 'bloodPressure', label: 'Blood Pressure', icon: Heart,
      placeholder: '120/80', type: 'text',
      iconColor: 'text-red-500', bg: 'bg-red-50', border: 'focus:border-red-400',
      emoji: '❤️', hint: 'mmHg'
    },
    {
      name: 'sugar', label: 'Blood Sugar', icon: Activity,
      placeholder: '90', type: 'number',
      iconColor: 'text-amber-500', bg: 'bg-amber-50', border: 'focus:border-amber-400',
      emoji: '🩸', hint: 'mg/dL'
    },
    {
      name: 'weight', label: 'Weight', icon: Activity,
      placeholder: '70', type: 'number',
      iconColor: 'text-blue-500', bg: 'bg-blue-50', border: 'focus:border-blue-400',
      emoji: '⚖️', hint: 'kg'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Vitals Record Karo</h2>
          <p className="text-gray-400 text-sm">Apne daily health stats track karo</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-glow-sm">
          <Plus className="w-5 h-5 text-white" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Vitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {vitalFields.map(({ name, label, icon: Icon, placeholder, type, iconColor, bg, border, emoji, hint }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {emoji} {label}
                <span className="text-xs text-gray-400 font-normal ml-1">({hint})</span>
              </label>
              <div className={`relative transition-all duration-200 ${focused === name ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === name ? iconColor : 'text-gray-300'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(name)}
                  onBlur={() => setFocused('')}
                  placeholder={placeholder}
                  className={`input-field pl-10 ${border}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Date */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📅 Date
          </label>
          <div className={`relative transition-all duration-200 ${focused === 'date' ? 'scale-[1.01]' : ''}`}>
            <Calendar className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === 'date' ? 'text-primary-500' : 'text-gray-300'}`} />
            <input
              type="date"
              name="entryDate"
              value={form.entryDate}
              onChange={handleChange}
              onFocus={() => setFocused('date')}
              onBlur={() => setFocused('')}
              className="input-field pl-11"
            />
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📝 Notes <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          <div className={`relative transition-all duration-200 ${focused === 'notes' ? 'scale-[1.005]' : ''}`}>
            <FileText className={`absolute left-3.5 top-3.5 w-4 h-4 transition-colors ${focused === 'notes' ? 'text-primary-500' : 'text-gray-300'}`} />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              onFocus={() => setFocused('notes')}
              onBlur={() => setFocused('')}
              rows={3}
              placeholder="Koi extra observation ya note daalo..."
              className="input-field pl-11 resize-none"
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
          {loading ? <Loader size="sm" /> :
            done ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Saved Successfully!
              </motion.div>
            ) : (
              <><Plus className="w-4 h-4" /> Vitals Save Karo</>
            )
          }
        </motion.button>
      </form>
    </div>
  )
}

export default VitalsForm