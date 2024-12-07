import { CardWrapper } from '@/components/auth/cardWrapper';
import { LoginForm } from '@/components/auth/loginForm';

export default function LoginPage() {
  return (
    <CardWrapper headerLabel="Selamat datang, Tuan Muda 😁" backButtonHref="/register" backButtonLabel="Tidak punya akun?">
      <LoginForm />
    </CardWrapper>
  );
}
