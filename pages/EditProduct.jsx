import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useParams } from 'react-router-dom';
import { customFetch } from '../utils/axios';
import Spinner from '../components/Spinner';

export default function EditProduct() {
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        customFetch.get(`/products/${id}`).then((res) => {
            setProductInfo(res.data);
            setIsLoading(false);
        });
    }, [id]);

    return (
        <div>
            <h2>Edit product</h2>
            {isLoading && <Spinner />}
            {!isLoading && <ProductForm {...productInfo} />}
        </div>
    );
}
