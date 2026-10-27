import Footer from "@/components/Footer";
import LoginCard from "@/components/LoginCard";

function Login() {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-background">
        <header className="w-full bg-primary flex items-center py-5 px-6">
          <div className="w-[85%] max-w-2xl mx-auto bg-background rounded-full px-8 py-3 flex items-center justify-center">
            <a
              className="text-primary font-bold text-lg underline text-center leading-tight"
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Saint_Andrew_the_First-Called_Georgian_University_of_the_Patriarchate_of_Georgia"
            >
              Saint Andrew the First-Called Georgian University
            </a>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-8">
          <img
            src="/sangu_logo.svg"
            alt="Saint Andrew University Logo"
            className="w-28 h-auto drop-shadow-md"
          />

          <LoginCard />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;