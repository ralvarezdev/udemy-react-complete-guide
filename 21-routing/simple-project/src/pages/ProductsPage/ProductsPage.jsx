import {Link} from 'react-router-dom';

const DUMMY_PRODUCTS = [
    {id: 'p1', title: 'Product 1', price: 6},
    {id: 'p2', title: 'Product 2', price: 7},
    {id: 'p3', title: 'Product 3', price: 8},
]

export default function ProductsPage() {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {DUMMY_PRODUCTS.map(product => (
                    <li key={product.id}><Link to={product.id}>{product.title}</Link></li>
                ))}
            </ul>
        </>
    )
}