import Logo from './Logo';
import NavLinks from './NavLink';

export default function Navbar() {
    return (
        <aside className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full">
            <div className="p-4 flex justify-between items-center">
                <Logo className={'w-36'} />
            </div>
            <NavLinks />
        </aside>
    );
}
