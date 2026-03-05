import AuthLayout from '../components/shared/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage = () => (
  <AuthLayout title="Account Banao" subtitle="HealthMate mein khush aamdeed!">
    <RegisterForm />
  </AuthLayout>
)

export default RegisterPage