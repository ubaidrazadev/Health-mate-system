import { Link } from 'react-router-dom'
import { Heart, Upload, Brain, Activity, Shield, ChevronRight, Star, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import LandingNavbar from '../components/shared/LandingNavbar'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const features = [
  { icon: Upload, title: 'Smart Report Upload', desc: 'PDF ya image drag & drop karo — Cloudinary par instantly secure ho jati hai', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
  { icon: Brain, title: 'Gemini AI Analysis', desc: 'Advanced AI aapki medical report ko scan karke simple Urdu/English mein explain karega', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', text: 'text-purple-600' },
  { icon: Activity, title: 'Vitals Dashboard', desc: 'BP, sugar, weight — sab ek jagah track karo with beautiful visual history', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { icon: Shield, title: '100% Secure & Private', desc: 'JWT authentication se protected — sirf aap apna data dekh sakte hain', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' },
]

const steps = [
  { num: '01', title: 'Account Banao', desc: 'Register karo aur email verify karo — sirf 2 minute lagenge', icon: '👤' },
  { num: '02', title: 'Report Upload Karo', desc: 'Medical report ya lab result PDF/image mein upload karo', icon: '📄' },
  { num: '03', title: 'AI Insights Lo', desc: 'Gemini AI turant analysis karke simple language mein samjhayega', icon: '🧠' },
]

const stats = [
  { value: 'Gemini 2.5', label: 'AI Model', icon: '⚡' },
  { value: '100%', label: 'Data Privacy', icon: '🔒' },
  { value: 'Instant', label: 'AI Analysis', icon: '🚀' },
  { value: 'Free', label: 'Get Started', icon: '🎁' },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <LandingNavbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-24 px-6 mesh-bg overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-10 right-10 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl"
          />
          {/* Floating pills */}
          {[
            { top: '15%', left: '8%', text: '🩺 AI Powered', delay: 0 },
            { top: '60%', left: '5%', text: '📊 Track Vitals', delay: 0.5 },
            { top: '20%', right: '6%', text: '🔒 Secure', delay: 1 },
            { top: '65%', right: '8%', text: '⚡ Instant', delay: 1.5 },
          ].map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ delay: pill.delay, duration: 4, repeat: Infinity, repeatDelay: 1 }}
              className="absolute hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/60 shadow-card px-3 py-1.5 rounded-full text-xs font-medium text-gray-700"
              style={{ top: pill.top, left: pill.left, right: pill.right }}
            >
              {pill.text}
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Pakistan ka #1 AI Health Companion
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
          >
            Apni Sehat Ko{' '}
            <span className="relative">
              <span className="gradient-text">Smart Tarike</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-emerald-400 rounded-full origin-left"
              />
            </span>
            {' '}Se{' '}
            <br className="hidden md:block" />
            Manage Karo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Medical reports upload karo, <span className="text-primary-600 font-semibold">Gemini AI</span> se samjho,
            vitals track karo — sab kuch ek jagah. <span className="text-emerald-600 font-semibold">Urdu aur English</span> dono mein.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 text-base">
                Abhi Shuru Karo — Free hai! <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/login" className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4">
                Login Karo
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map(({ value, label, icon }) => (
              <motion.div key={label} variants={fadeUp}
                className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-4 shadow-sm">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="font-display text-lg font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary-100">
              <Zap className="w-3.5 h-3.5" /> Key Features
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kya Kya Kar Sakte Ho?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Sab kuch design kiya gaya hai aapki sehat ko simple aur smart banane ke liye
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map(({ icon: Icon, title, desc, color, bg, text }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex gap-5">
                  <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${text}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      {[...Array(3)].map((_, j) => (
                        <CheckCircle key={j} className={`w-3.5 h-3.5 ${text}`} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">Professionally built</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-24 px-6 mesh-bg relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-white/80 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary-100">
              <Star className="w-3.5 h-3.5" /> Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kaise Kaam Karta Hai?
            </h2>
            <p className="text-gray-400 text-lg">Sirf 3 steps — 5 minute mein shuru ho jao</p>
          </motion.div>

          <div className="relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-primary-200 via-emerald-300 to-primary-200" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {steps.map(({ num, title, desc, icon }, i) => (
                <motion.div key={num} variants={fadeUp} className="text-center relative">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-glow text-2xl relative z-10"
                  >
                    {icon}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-primary-600">{num}</span>
                    </div>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed px-4">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-700" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, delay: 3 }}
            className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Aaj Hi Shuru Karo
          </h2>
          <p className="text-primary-200 text-lg mb-10 leading-relaxed">
            Apni sehat apne haath mein lo — register karo aur AI se apni reports samjho
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-colors shadow-xl text-base">
                Free Account Banao <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/login"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base backdrop-blur-sm">
                Login Karo <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-gray-950 text-gray-500 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-display text-white font-bold">HealthMate</span>
          </div>
          <p className="text-sm">© 2025 HealthMate — Apni Sehat, Apna Haath 🇵🇰</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/register" className="hover:text-primary-400 transition-colors">Register</Link>
            <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage