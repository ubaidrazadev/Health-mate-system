import AuthLayout from '../components/shared/AuthLayout'
import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => (
  <AuthLayout title="Wapas Aaiye!" subtitle="Apne account mein login karo">
    <LoginForm />
  </AuthLayout>
)

export default LoginPage