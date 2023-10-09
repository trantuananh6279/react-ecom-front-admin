import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils/axios';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { getUserFromLocalStorage } from '../utils/localStorage';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = getUserFromLocalStorage();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('Please fill out all the fields');
            return;
        }
        register();
    }

    function register() {
        const data = { name, email, password };
        setIsLoading(true);
        customFetch
            .post('/auth/register', data)
            .then((res) => {
                toast.success(res.data.msg);
                setIsLoading(false);
                navigate('/login');
            })
            .catch((err) => {
                toast.error(err.response.data.msg);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    return (
        <div className="grid place-items-center h-screen">
            {isLoading && <Spinner />}
            {!isLoading && (
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary w-[450px]">
                    <h1 className="text-xl font-bold my-4">Register</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button className="bg-primary text-white font-bold cursor-pointer px-6 py-2">
                            Register
                        </button>
                        <Link className="text-sm mt-3 text-right" to={'/login'}>
                            Already have an account?{' '}
                            <span className="underline">Login</span>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
}
