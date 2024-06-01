
import LoginForm from '@components/loginForm';


export default function LoginPage() {

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col z-30">
        <LoginForm />
      </div>
    </main>
  );
}
