import { HiDatabase } from 'react-icons/hi';
import { BsWindowDock } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineCalendar } from 'react-icons/ai';

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
        text: 'Notification',
        icon: <IoMdNotificationsOutline className="w-6 h-6" />,
        path: '/notifications',
    },
    {
        id: '4',
        text: 'Calendar',
        icon: <AiOutlineCalendar className="w-6 h-6" />,
        path: '/calendars',
    },
    {
        id: '5',
        text: 'Settings',
        icon: <AiOutlineSetting className="w-6 h-6" />,
        path: '/settings',
    },
];
