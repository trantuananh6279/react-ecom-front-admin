import { useEffect, useState } from 'react';
import { customFetch } from '../utils/axios';
import Spinner from '../components/Spinner';

export default function OrdersPage() {
    const [orders, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        customFetch
            .get('/orders')
            .then((res) => {
                setOrder(res.data);
                setIsLoading(false);
            })
            .catch((err) => setIsLoading(false));
    }, []);

    return (
        <div className="overflow-auto">
            <table className="basic">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>email</td>
                        <td>address</td>
                        <td>paid</td>
                        <td>products</td>
                        <td>date</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={7}>
                                <div className="py-4">
                                    <Spinner fullWidth={true} />
                                </div>
                            </td>
                        </tr>
                    )}
                    {!isLoading &&
                        orders.length > 0 &&
                        orders.map((order, i) => {
                            const {
                                line_items,
                                name,
                                email,
                                city,
                                streetAddress,
                                paid,
                                createdAt,
                            } = order;
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                        {city} <br /> {streetAddress}
                                    </td>
                                    <td
                                        className={
                                            paid
                                                ? 'text-green-600'
                                                : 'text-red-400'
                                        }
                                    >
                                        {paid ? 'YES' : 'NO'}
                                    </td>
                                    <td>
                                        {line_items.map((item, i) => (
                                            <span key={i}>
                                                {
                                                    item.price_data
                                                        ?.product_data?.name
                                                }
                                                x {item.quantity} <br />
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {new Date(createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
