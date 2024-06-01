
import LoginForm from '@components/loginForm';


export default function LoginPage() {

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-800">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 z-30">
        <LoginForm />
      </div>
    </main>
  );
}
