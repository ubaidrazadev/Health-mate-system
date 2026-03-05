import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { verifyEmailApi } from '../api/authApi'
import AuthLayout from '../components/shared/AuthLayout'

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token nahi mila')
      return
    }
    verifyEmailApi(token)
      .then(() => {
        setStatus('success')
        setMessage('Email verify ho gayi! Ab login karo.')
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err.response?.data?.message || 'Verification fail ho gayi')
      })
  }, [token])

  return (
    <AuthLayout title="Email Verification">
      <div className="text-center py-4 space-y-4">

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            <p className="text-gray-600">Verify ho raha hai...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-14 h-14 text-primary-600" />
            <p className="text-gray-700">{message}</p>
            <Link to="/login" className="btn-primary mt-2">Login Karo</Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="w-14 h-14 text-red-500" />
            <p className="text-red-600">{message}</p>
            <Link to="/register" className="btn-outline mt-2">Dobara Register Karo</Link>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}

export default VerifyEmailPage