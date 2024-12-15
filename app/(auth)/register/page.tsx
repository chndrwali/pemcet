import { CardWrapper } from '@/components/auth/cardWrapper';
import { RegisterForm } from '@/components/auth/registerForm';

export default function RegisterPage() {
  return (
    <CardWrapper headerLabel="Daftar" headerDescription="Gunakan nama, email dan password untuk mendaftar" backButtonLabel="Sudah punya akun?" backButtonHref="/login">
      <RegisterForm />
    </CardWrapper>
  );
}
