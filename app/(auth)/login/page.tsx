import { CardWrapper } from '@/components/auth/cardWrapper';
import { LoginForm } from '@/components/auth/loginForm';

export default function LoginPage() {
  return (
    <CardWrapper headerLabel="Masuk" headerDescription="Gunakan email dan password untuk masuk" backButtonHref="/register" backButtonLabel="Tidak punya akun?">
      <LoginForm />
    </CardWrapper>
  );
}
