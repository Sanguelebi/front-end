import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    placeholder=""
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
