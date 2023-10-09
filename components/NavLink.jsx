import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from '../utils/localStorage';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { HiDatabase } from 'react-icons/hi';
import { BiCategory, BiLogOut } from 'react-icons/bi';
import { BsWindowDock } from 'react-icons/bs';

const links = [
    {
        id: '1',
        text: 'Products',
        icon: <HiDatabase className="w-6 h-6" />,
        path: '/products',
    },
    {
        id: '2',
        text: 'Orders',
        icon: <BsWindowDock className="w-6 h-6" />,
        path: '/orders',
    },
    {
        id: '3',
        text: 'Categories',
        icon: <BiCategory className="w-6 h-6" />,
        path: '/categories',
    },
    {
        id: '4',
        text: 'Settings',
        icon: <AiOutlineSetting className="w-6 h-6" />,
        path: '/settings',
    },
];

export default function NavLinks() {
    const inactiveLink = 'flex gap-3 py-3 px-6';
    const activeLink = `${inactiveLink} bg-primary text-white rounded-sm`;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function logout() {
        removeUserFromLocalStorage();
        navigate('/login');
    }

    return (
        <nav>
            <Link
                to="/"
                className={pathname === '/' ? activeLink : inactiveLink}
            >
                <AiOutlineHome />
                Stats
            </Link>

            {links.map((link, i) => (
                <Link
                    key={i}
                    to={link.path}
                    className={
                        pathname.includes(link.path) ? activeLink : inactiveLink
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
    );
}
