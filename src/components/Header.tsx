import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import type { RootState } from '@/store/store';
import { clearUser } from '@/store/slices/userSlice';
import { logout } from '@/services/authService';
import type { SubjectType } from '@/models/api';

const CATEGORY_OPTIONS: { label: string; value: '' | SubjectType }[] = [
    { label: 'ყველა საგანი', value: '' },
    { label: 'პროფესიული', value: 'professional' },
    { label: 'თავისუფალი კრედიტი', value: 'free' },
];

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const userMenuRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    const isLoginPage = location.pathname === '/login';
    const activeCategory = (searchParams.get('category') || '') as '' | SubjectType;
    const activeCategoryLabel =
        CATEGORY_OPTIONS.find((opt) => opt.value === activeCategory)?.label ?? 'კატეგორიები';

    // Role checks
    const role = (user.role || '').toLowerCase();
    const isCoordinator = role === 'coordinator' || role === 'კოორდინატორი';
    const isProgramHead =
        role === 'manager' ||
        role === 'program_head' ||
        role === 'program_lead' ||
        role === 'პროგრამის ხელმძღვანელი';
    const isAdmin = role === 'admin' || role === 'ადმინი';
    // Default to student if role is student or empty/guest
    const isStudent =
        role === 'student' || role === 'სტუდენტი' || (!isCoordinator && !isProgramHead && !isAdmin);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(target)) {
                setIsUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside as EventListener);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as EventListener);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch {
            // Clear local session even if server request fails
        } finally {
            dispatch(clearUser());
            setIsUserMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <header className="bg-primary w-full shadow-md select-none">
            {/* Login page banner */}
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
                /* Authenticated / Main Header */
                <div className="flex justify-between items-center font-medium mx-6 lg:mx-10 py-4">
                    {/* Brand Title */}
                    <Link
                        to="/"
                        className="text-background text-2xl lg:text-3xl font-semibold hover:opacity-95 transition-opacity"
                    >
                        Course Selection Platform
                    </Link>

                    {/* Navigation Items based on User Role */}
                    <div className="flex items-center gap-8 lg:gap-14">
                        {/* 1. სტუდენტი (Student) - Figma Design 1 */}
                        {isStudent && (
                            <>
                                <div className="relative inline-block" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="px-4 py-2 flex items-center justify-between gap-4 cursor-pointer hover:opacity-90"
                                    >
                                        <span className="text-background text-base lg:text-lg">
                                            {activeCategory ? activeCategoryLabel : 'კატეგორიები'}
                                        </span>
                                        <Icon
                                            icon={
                                                isDropdownOpen
                                                    ? 'mdi:chevron-up'
                                                    : 'mdi:chevron-down'
                                            }
                                            className="text-background text-xl"
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-52 border-background border-2 rounded-xl text-white bg-primary/95 shadow-xl z-20 overflow-hidden">
                                            {CATEGORY_OPTIONS.map((option) => {
                                                const isSelected = activeCategory === option.value;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={option.label}
                                                        onClick={() => {
                                                            setIsDropdownOpen(false);
                                                            navigate(
                                                                option.value
                                                                    ? `/?category=${option.value}`
                                                                    : '/'
                                                            );
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 hover:bg-white/10 cursor-pointer transition-colors ${
                                                            isSelected
                                                                ? 'bg-white/20 font-bold underline'
                                                                : ''
                                                        }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to="/chooseplatform"
                                    className="text-background text-base lg:text-lg hover:underline transition-all"
                                >
                                    აირჩიე საგნები
                                </Link>
                            </>
                        )}

                        {/* 2. კოორდინატორი (Coordinator) - Figma Design 2 */}
                        {isCoordinator && (
                            <div className="flex items-center gap-6 lg:gap-10">
                                <Link
                                    to="/"
                                    className={`text-background text-base lg:text-lg cursor-pointer ${
                                        location.pathname === '/'
                                            ? 'underline underline-offset-8 font-bold'
                                            : 'hover:underline font-medium'
                                    }`}
                                >
                                    საგნები
                                </Link>
                                <Link
                                    to="/requests"
                                    className={`text-background text-base lg:text-lg cursor-pointer ${
                                        location.pathname === '/requests'
                                            ? 'underline underline-offset-8 font-bold'
                                            : 'hover:underline font-medium'
                                    }`}
                                >
                                    მოთხოვნები
                                </Link>
                            </div>
                        )}

                        {/* 3. პროგრამის ხელმძღვანელი (Program Head) - Figma Design 3 */}
                        {isProgramHead && (
                            <div className="flex items-center gap-6 lg:gap-10">
                                <Link
                                    to="/courses"
                                    className="text-background text-base lg:text-lg hover:underline cursor-pointer font-medium"
                                >
                                    საგნები
                                </Link>
                                <Link
                                    to="/students"
                                    className="text-background text-base lg:text-lg underline underline-offset-8 cursor-pointer font-bold"
                                >
                                    სტუდენტები
                                </Link>
                            </div>
                        )}

                        {/* 4. ადმინი (Admin) - Figma Design 4 */}
                        {isAdmin && (
                            <span className="text-background font-bold tracking-wider text-base lg:text-lg cursor-default">
                                ADMIN MODE
                            </span>
                        )}

                        {/* User Avatar & Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
                                title={
                                    user.first_name
                                        ? `${user.first_name} ${user.last_name}`
                                        : 'მომხმარებელი'
                                }
                                aria-label="მომხმარებლის პროფილი"
                            >
                                {isStudent ? (
                                    <Icon
                                        icon="mdi:account-circle"
                                        className="text-white size-11 lg:size-12"
                                    />
                                ) : (
                                    <Icon
                                        icon="mdi:account-circle-outline"
                                        className="text-white size-11 lg:size-12"
                                    />
                                )}
                            </button>

                            {/* User Profile Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 bg-background border-2 border-primary rounded-2xl shadow-2xl p-4 z-30 text-[#1a1a1a]">
                                    {user.id !== -1 ? (
                                        <>
                                            <div className="pb-3 border-b border-primary/20">
                                                <p className="font-bold text-base text-primary">
                                                    {user.first_name} {user.last_name}
                                                </p>
                                                <p className="text-xs text-gray-600 truncate">
                                                    {user.email}
                                                </p>
                                                <div className="mt-2 inline-block bg-primary text-background text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                                                    {user.role}
                                                </div>
                                                {user.student_status && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        სტატუსი: {user.student_status}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full mt-3 flex items-center justify-center gap-2 py-1.5 px-3 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition cursor-pointer"
                                            >
                                                <Icon icon="mdi:logout" className="size-4" />
                                                გამოსვლა
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center py-2">
                                            <p className="text-sm text-gray-600 mb-3">
                                                ავტორიზებული არ ხართ
                                            </p>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="block w-full py-1.5 px-3 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition text-center"
                                            >
                                                შესვლა
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
