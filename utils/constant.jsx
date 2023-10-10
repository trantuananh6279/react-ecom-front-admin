import { HiDatabase } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import { BsWindowDock } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';

export const links = [
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
