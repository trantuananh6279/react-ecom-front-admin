import { useEffect, useState } from 'react';
import { customFetch } from '../utils/axios';
import Spinner from '../components/Spinner';
import { subHours } from 'date-fns';
import StatsHeader from '../components/StatsHeader';
import BarChart from '../components/BarChart';
import TopDeal from '../components/TopDeal';

export default function Stats() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        customFetch
            .get('/orders')
            .then((res) => {
                setOrders(res.data);
                setIsLoading(false);
            })
            .then((res) => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="my-4">
                <Spinner fullWidth={true} />
            </div>
        );
    }

    const ordersToday = orders.filter(
        (o) => new Date(o.createdAt) > subHours(new Date(), 24)
    );
    const ordersWeek = orders.filter(
        (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
    );
    const ordersMonth = orders.filter(
        (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
    );

    return (
        <div>
            <StatsHeader
                ordersToday={ordersToday}
                ordersWeek={ordersWeek}
                ordersMonth={ordersMonth}
            />
            <div className="flex gap-4 mt-4 h-[500px]">
                <BarChart />
                <TopDeal />
            </div>
            <div className="block md:flex gap-4 mt-4 h-[228px]">
                <div className="bg-whiteColor flex-1 h-[228px]">
                    Notification
                </div>
                <div className="bg-whiteColor md:w-[331px] w-full h-[228px] mt-4 md:mt-0">
                    New users
                </div>
            </div>
        </div>
    );
}
