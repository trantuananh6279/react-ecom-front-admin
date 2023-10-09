import { Link } from 'react-router-dom';

export default function Logo({ className = 'w-40' }) {
    return (
        <Link to={'/'}>
            <img
                className={className}
                src="https://the-vivid-theme.myshopify.com/cdn/shop/files/vivid-logo2.png?v=1683567381&width=500"
            />
        </Link>
    );
}
