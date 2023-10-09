import Logo from './Logo';
import NavLinks from './NavLink';
import { AiOutlineClose } from 'react-icons/ai';

export default function Sidebar({ showSidebar, setShowSidebar }) {
    return (
        <aside className={showSidebar ? 'sidebar show-sidebar' : 'sidebar'}>
            <div className="p-4 flex justify-between items-center">
                <Logo className={'w-24'} />
                <button onClick={() => setShowSidebar(false)}>
                    <AiOutlineClose className="w-6 h-6" />
                </button>
            </div>
            <NavLinks />
        </aside>
    );
}
