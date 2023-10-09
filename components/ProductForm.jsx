import { useState } from 'react';
import { customFetch } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({
    _id,
    name: existingName,
    price: existingPrice,
    images: existingImages,
    description: existingDescription,
    category: existingCategory,
    featured: existingFeatured,
}) {
    const [values, setValues] = useState({
        name: existingName || '',
        price: existingPrice || '',
        description: existingDescription || '',
        category: existingCategory || 'office',
        company: 'ikea',
        featured: existingFeatured || false,
        images: existingImages || [],
        categories: ['office', 'kitchen', 'bedroom'],
        companies: ['ikea', 'liddy', 'marcos'],
    });
    const [goToProduct, setGoToProduct] = useState(false);
    const navigate = useNavigate();

    const {
        name,
        price,
        description,
        category,
        company,
        featured,
        images,
        categories,
        companies,
    } = values;

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

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'price') {
            value = parseInt(e.target.value);
        }
        if (name === 'featured') {
            value = e.target.checked;
        }
        setValues({ ...values, [name]: value });
    }

    return (
        <form className="w-full" onSubmit={saveProduct}>
            <label>Name</label>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
            />

            {/* Price */}
            <label>Price (USD)</label>
            <input
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={handleChange}
            />

            {/* Description */}
            <label>Description</label>
            <textarea
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleChange}
            />

            {/* Category */}
            <label>Category</label>
            <select name="category" onChange={handleChange}>
                {categories.map((category, i) => (
                    <option key={i} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Company */}
            <label>Company</label>
            <select name="company" onChange={handleChange}>
                {companies.map((company, i) => (
                    <option key={i} value={company}>
                        {company}
                    </option>
                ))}
            </select>

            {/* Featured */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    checked={featured}
                    onChange={handleChange}
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
