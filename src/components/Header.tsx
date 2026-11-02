import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

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
                                <Icon
                                    icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                                    className="text-background text-xl"
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute top-full left-0 mt-1 w-full border-background border-2 rounded text-white bg-primary/80 shadow-md z-10">
                                    {options.map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 hover:underline cursor-pointer"
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <h3 className="text-background">აირჩიე საგნები</h3>

                        <Icon
                            icon="mdi:account-circle"
                            className="text-white size-12 cursor-pointer hover:opacity-90"
                        />
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
