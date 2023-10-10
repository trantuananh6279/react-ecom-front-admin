import Logo from './Logo';
import { AiOutlineClose } from 'react-icons/ai';
import { links } from '../utils/constant';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from '../utils/localStorage';

export default function Sidebar({ showSidebar, setShowSidebar }) {
    const inactiveLink = 'flex gap-3 py-3 px-6';
    const activeLink = `${inactiveLink} bg-primary text-white rounded-sm`;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function logout() {
        removeUserFromLocalStorage();
        navigate('/login');
    }

    return (
        <aside className={showSidebar ? 'sidebar show-sidebar' : 'sidebar'}>
            <div className="p-4 flex justify-between items-center">
                <Logo className={'w-24'} />
                <button onClick={() => setShowSidebar(false)}>
                    <AiOutlineClose className="w-6 h-6" />
                </button>
            </div>
            <nav>
                <Link
                    to="/"
                    onClick={() => setShowSidebar(false)}
                    className={pathname === '/' ? activeLink : inactiveLink}
                >
                    <AiOutlineHome className="w-6 h-h6" />
                    Stats
                </Link>

                {links.map((link, i) => (
                    <Link
                        key={i}
                        onClick={() => setShowSidebar(false)}
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
