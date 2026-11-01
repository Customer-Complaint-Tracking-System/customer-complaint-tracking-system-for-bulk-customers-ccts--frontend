
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50">
      {/* Login section */}
      <section className="relative border-2 flex flex-1 items-center justify-center overflow-hidden px-6 py-14">
        <div className="relative w-full max-w-md border p-5">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
