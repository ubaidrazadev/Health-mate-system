import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, Sparkles, X, Cloud, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { uploadReportApi } from '../api/reportApi'
import AiInsightCard from './AiInsightCard'
import Loader from '../components/shared/Loader'

const ReportUploader = () => {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    if (!allowed.includes(f.type)) { toast.error('Sirf PDF ya Image upload kar sakte hain'); return }
    if (f.size > 10 * 1024 * 1024) { toast.error('File 10MB se chhoti honi chahiye'); return }
    setFile(f)
    setResult(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleUpload = async () => {
    if (!file) { toast.error('Pehle file select karo'); return }
    const fd = new FormData()
    fd.append('report', file)
    setLoading(true)
    try {
      const res = await uploadReportApi(fd)
      setResult(res.data.data)
      toast.success('Report upload aur AI analysis ho gayi! 🎉')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload fail ho gayi')
    } finally {
      setLoading(false)
    }
  }

  const getFileIcon = () => {
    if (!file) return null
    if (file.type === 'application/pdf') return '📄'
    return '🖼️'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Medical Report Upload</h2>
          <p className="text-gray-400 text-sm">PDF ya image upload karo — Gemini AI instantly analysis karega</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5 text-primary-600" />
          <span className="text-xs font-bold text-primary-700">AI Ready</span>
        </div>
      </div>

      {/* Features row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🔒', text: 'Secure Upload' },
          { icon: '🧠', text: 'AI Analysis' },
          { icon: '⚡', text: 'Instant Result' },
        ].map(({ icon, text }) => (
          <div key={text} className="bg-primary-50 border border-primary-100 rounded-xl p-2.5 text-center">
            <p className="text-lg">{icon}</p>
            <p className="text-xs font-semibold text-primary-700 mt-1">{text}</p>
          </div>
        ))}
      </div>

      {/* Drop Zone */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onClick={() => !file && fileRef.current?.click()}
        animate={{
          borderColor: dragging ? '#16a34a' : file ? '#22c55e' : '#e5e7eb',
          backgroundColor: dragging ? '#f0fdf4' : file ? '#f8fff9' : '#fafafa',
        }}
        className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200 relative overflow-hidden"
      >
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleFile(e.target.files[0])} />

        {dragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-primary-500/5 flex items-center justify-center"
          >
            <p className="text-primary-600 font-bold text-lg">Yahan drop karo! 🎯</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center shadow-glow-sm text-3xl">
                {getFileIcon()}
              </div>
              <div>
                <p className="font-bold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-primary-600 font-semibold bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
                  <CheckCircle className="w-3.5 h-3.5" /> File ready hai
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Cloud className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-gray-700">File yahan drag & drop karo</p>
                <p className="text-sm text-gray-400 mt-1">ya <span className="text-primary-600 font-semibold underline cursor-pointer">click karke browse karo</span></p>
                <p className="text-xs text-gray-300 mt-2">PDF, PNG, JPG • Max 10MB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Upload Button */}
      <AnimatePresence>
        {file && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.button
              onClick={handleUpload}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader size="sm" />
                  <span>Gemini AI analysis kar raha hai...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Upload & AI Analysis Karo
                  <Upload className="w-4 h-4" />
                </>
              )}
            </motion.button>
            {loading && (
              <p className="text-center text-xs text-gray-400 mt-2 animate-pulse">
                ⏳ Yeh 15-30 seconds le sakta hai...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-primary-800 text-sm">Upload Successful!</p>
                <p className="text-xs text-primary-600">AI insights neeche available hain</p>
              </div>
            </div>
            <AiInsightCard insight={result.aiInsight} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReportUploader