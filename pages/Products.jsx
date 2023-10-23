import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customFetch } from '../utils/axios';
import Spinner from '../components/Spinner';
import Swal from 'sweetalert2';
import formatPrice from '../utils/formatPrice';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        setIsLoading(true);
        customFetch.get('/products').then((res) => {
            setProducts(res.data);
            setIsLoading(false);
        });
    }

    async function deleteProduct(p) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${p.name}`,
            icon: 'question',
            confirmButtonText: 'YES',
            confirmButtonColor: '#475BE8',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await customFetch.delete(`/products/${p._id}`).then((res) => {
                    Swal.fire({
                        title: `${p.name} is removed`,
                        icon: 'success',
                    });
                    getAllProducts();
                });
            }
        });
    }

    return (
        <div className="overflow-auto">
            <Link to={'/products/new'} className="btn-primary">
                Add new products
            </Link>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>images</td>
                        <td>name</td>
                        <td>price</td>
                        <td>category</td>
                        <td>company</td>
                        <td></td>
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
                        products.length > 0 &&
                        products.map((p, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <img
                                        src={p.images[0]}
                                        className="w-8 h-8"
                                    />
                                </td>
                                <td>{p.name}</td>
                                <td>{formatPrice(p.price)}</td>
                                <td>{p.category}</td>
                                <td>{p.company}</td>
                                <td>
                                    <Link
                                        to={`/products/edit/${p._id}`}
                                        className="btn-primary"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn-red"
                                        onClick={() => deleteProduct(p)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
