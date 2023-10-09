import ProductForm from '../components/ProductForm';

export default function AddProduct() {
    return (
        <>
            <h2>Add new product</h2>
            <div className="grid place-items-center">
                <ProductForm />
            </div>
        </>
    );
}
