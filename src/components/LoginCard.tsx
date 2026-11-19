import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { setUser } from '@/store/slices/userSlice';
import { login } from '@/services/authService';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const user = await login({ email: email.trim(), password });
            dispatch(setUser(user));

            const serialized = JSON.stringify(user);
            if (remember) {
                localStorage.setItem('user', serialized);
                sessionStorage.removeItem('user');
            } else {
                sessionStorage.setItem('user', serialized);
                localStorage.removeItem('user');
            }

            navigate('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const apiError = err.response?.data?.error as string | undefined;
                setError(apiError || 'ავტორიზაცია ვერ მოხერხდა. შეამოწმეთ მონაცემები.');
            } else {
                setError('ავტორიზაცია ვერ მოხერხდა.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-primary rounded-3xl px-10 py-10 w-full max-w-md mx-auto flex flex-col items-center gap-6 shadow-2xl">
            <div className="text-center">
                <h2 className="text-background text-3xl font-bold">Course Selection Platform</h2>
                <p className="text-background/70 mt-2 text-sm">Please log into your account</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <Input
                    id="email"
                    label="Log in"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="g.beridze@university.edu"
                    required
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <div className="bg-red-500/20 border border-red-300/60 text-white text-sm rounded-xl px-3.5 py-2 text-center">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-between text-background text-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 accent-background cursor-pointer"
                        />
                        Remember me
                    </label>
                    <a href="#" className="hover:underline font-medium">
                        Forgot Password?
                    </a>
                </div>

                <Button
                    type="submit"
                    variant="background"
                    disabled={isSubmitting}
                    className="w-fit mx-auto mt-2 disabled:opacity-60"
                >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
            </form>
        </div>
    );
}

export default LoginCard;
