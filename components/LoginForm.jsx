import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/axios';
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
} from '../utils/localStorage';
import Spinner from './Spinner';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = getUserFromLocalStorage();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill out all the fields');
            return;
        }
        login();
    }

    function login() {
        const data = { email, password };
        setIsLoading(true);
        customFetch
            .post('/auth/login', data)
            .then((res) => {
                addUserToLocalStorage(res.data);
                setIsLoading(false);
                navigate('/');
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
        <div className="grid place-items-center h-screen ">
            {isLoading && <Spinner />}
            {!isLoading && (
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary w-[450px]">
                    <h1 className="text-xl font-bold my-4">Login</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
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
                            Login
                        </button>
                        <Link
                            className="text-sm mt-3 text-right"
                            to={'/register'}
                        >
                            Don&apos;t have an account?{' '}
                            <span className="underline">Register</span>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
}
