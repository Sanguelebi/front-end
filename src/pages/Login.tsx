import CourseCard from '@/components/CourseCard';
import Footer from '@/components/Footer';
import LoginCard from '@/components/LoginCard';

function Login() {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-8">
          <img
            src="/sangu_logo.svg"
            alt="Saint Andrew University Logo"
            className="w-28 h-auto drop-shadow-md"
          />

          <LoginCard />
        </div>

        <CourseCard title="Java" instructor="Irakli" category="IT" image="/course.svg" />
      </main>

      <Footer />
    </>
  );
}

export default Login;
