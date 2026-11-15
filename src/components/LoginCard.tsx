import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { setUser } from '@/store/slices/userSlice';
import { findMockUser } from '@/services/mockUsers';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const user = findMockUser(email);
        dispatch(setUser(user));

        if (remember) {
            // TODO: Add logic for rememebering.
        }

        navigate('/');
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
                    placeholder="აქ ჩაწერე ელფოსტა."
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="აქ ჩაწერე პაროლი."
                />

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

                <Button type="submit" variant="background" className="w-fit mx-auto mt-2">
                    Log in
                </Button>
            </form>
        </div>
    );
}

export default LoginCard;
