import AuthLayout from '../components/shared/AuthLayout'
import ChangePasswordForm from '../components/auth/ChangePasswordForm'

const ChangePasswordPage = () => (
  <AuthLayout title="Naya Password" subtitle="Apna naya secure password set karo">
    <ChangePasswordForm />
  </AuthLayout>
)

export default ChangePasswordPage