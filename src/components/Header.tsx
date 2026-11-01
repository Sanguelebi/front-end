import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const options: string[] = ['არჩევითი', 'თავისუფალი კრედიტი', 'სავალდებულო'];

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, []);

  return (
    <header className="bg-primary w-full">
      {/* კონდიციური რენდერი: თუ ლოგინის გვერდზე ვართ, ვაჩვენებთ უნივერსიტეტის ბანერს */}
      {isLoginPage ? (
        <div className="w-full py-5 px-6 flex items-center justify-center">
          <div className="w-[85%] max-w-2xl mx-auto bg-background rounded-full px-8 py-3 flex items-center justify-center">
            <a
              className="text-primary font-bold text-lg underline text-center leading-tight"
              target="_blank"
              rel="noreferrer"
              href="https://sangu.edu.ge/"
            >
              Saint Andrew the First-Called Georgian University
            </a>
          </div>
        </div>
      ) : (
        /* სხვა გვერდებზე გამოჩნდება ჩვეულებრივი ნავიგაციის ჰედერი */
        <div className="flex justify-between items-center font-medium mx-5 py-4">
          <h1 className="text-background text-3xl">Course Selection Platform</h1>

          <div className="flex items-center gap-15">
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 flex items-center justify-between gap-4"
              >
                <span className="text-background">კატეგორიები</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full border-background border-2 rounded text-white bg-primary/80 shadow-md z-10">
                  {options.map((option) => (
                    <div key={option} className="px-4 py-2 hover:underline cursor-pointer">
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <h3 className="text-background">აირჩიე საგნები</h3>

            <div className="size-12">
              <svg className="fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
