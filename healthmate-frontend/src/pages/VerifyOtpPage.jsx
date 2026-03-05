import AuthLayout from '../components/shared/AuthLayout'
import OtpForm from '../components/auth/OtpForm'

const VerifyOtpPage = () => (
  <AuthLayout title="OTP Verify Karo" subtitle="Email mein bheja gaya 6-digit code daalo">
    <OtpForm />
  </AuthLayout>
)

export default VerifyOtpPage