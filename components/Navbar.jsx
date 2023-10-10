import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from '../utils/localStorage';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { links } from '../utils/constant';

export default function Navbar() {
    const inactiveLink = 'flex gap-3 py-3 px-6';
    const activeLink = `${inactiveLink} bg-primary text-white rounded-sm`;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function logout() {
        removeUserFromLocalStorage();
        navigate('/login');
    }

    return (
        <aside className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full">
            <div className="p-4 flex justify-between items-center">
                <Logo className={'w-36 mb-4'} />
            </div>
            <nav>
                <Link
                    to="/"
                    className={pathname === '/' ? activeLink : inactiveLink}
                >
                    <AiOutlineHome className="w-6 h-6" />
                    Stats
                </Link>

                {links.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={
                            pathname.includes(link.path)
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        {link.icon}
                        {link.text}
                    </Link>
                ))}
                <button className={`${inactiveLink} w-full`} onClick={logout}>
                    <BiLogOut className="w-6 h-6" />
                    Log out
                </button>
            </nav>
        </aside>
    );
}
