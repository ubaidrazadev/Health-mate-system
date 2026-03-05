import AuthLayout from '../components/shared/AuthLayout'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

const ForgotPasswordPage = () => (
  <AuthLayout title="Password Reset" subtitle="Email se OTP bhejenge">
    <ForgotPasswordForm />
  </AuthLayout>
)

export default ForgotPasswordPage