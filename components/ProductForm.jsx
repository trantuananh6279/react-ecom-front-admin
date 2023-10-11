import { useState } from 'react';
import { customFetch } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUpload } from 'react-icons/ai';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';

export default function ProductForm({
    _id,
    name: existingName,
    price: existingPrice,
    images: existingImages,
    description: existingDescription,
    category: existingCategory,
    company: existingCompany,
    featured: existingFeatured,
    stock: existingStock,
}) {
    const [name, setName] = useState(existingName || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(existingCategory || 'office');
    const [company, setCompany] = useState(existingCompany || 'ikea');
    const [featured, setFeatured] = useState(existingFeatured || false);
    const [stock, setStock] = useState(existingStock || 0);
    const [categories, setCategories] = useState([
        'office',
        'kitchen',
        'bedroom',
    ]);
    const [companies, setCompanies] = useState([
        'ikea',
        'liddy',
        'marcos',
        'caressa',
    ]);
    const [goToProduct, setGoToProduct] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    async function saveProduct(e) {
        e.preventDefault();
        const data = {
            name,
            price,
            images,
            description,
            category,
            company,
            featured,
            stock,
        };
        if (_id) {
            await customFetch.patch(`/products/${_id}`, { ...data, _id });
        } else {
            await customFetch.post('/products', data);
        }
        setGoToProduct(true);
    }

    if (goToProduct) {
        navigate('/products');
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const resp = await customFetch.post('/upload', data);
            setImages((oldImages) => {
                return [...oldImages, ...resp.data.links];
            });
            setIsUploading(false);
        }
    }
    function uploadImagesOrder(images) {
        setImages(images);
    }

    return (
        <form className="w-full" onSubmit={saveProduct}>
            {/* Name */}
            <label>Name</label>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* Photo */}
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                    list={images}
                    className="flex flex-wrap gap-1"
                    setList={uploadImagesOrder}
                >
                    {!!images?.length &&
                        images.map((link) => (
                            <div
                                key={link}
                                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                            >
                                <img src={link} className="rounded-lg" />
                            </div>
                        ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}

                <label className="w-24 h-24 cursor-pointer border text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border-primary">
                    <AiOutlineUpload />
                    <div>Upload</div>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={uploadImages}
                    />
                </label>
            </div>

            {/* Price */}
            <label>Price (USD)</label>
            <input
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
            />

            {/* Description */}
            <label>Description</label>
            <textarea
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Category */}
            <label>Category</label>
            <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
            >
                {categories.map((category, i) => (
                    <option key={i} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Company */}
            <label>Company</label>
            <select name="company" onChange={(e) => setCompany(e.target.value)}>
                {companies.map((company, i) => (
                    <option key={i} value={company}>
                        {company}
                    </option>
                ))}
            </select>

            {/* Stock */}
            <label>Stock</label>
            <input
                type="number"
                placeholder="Stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
            />

            {/* Featured */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="m-0 w-4 h-4"
                />
                <label>Featured product</label>
            </div>
            <button type="submit" className="btn-primary mt-4">
                Save
            </button>
        </form>
    );
}
