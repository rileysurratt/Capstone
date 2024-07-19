import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const result = await response.json();

                setProduct(result);
                // console.log(result);
                setLoading(false);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
            } catch (error) {
                setLoading(false)
                setError(error.message);
                console.log(error)
                setMessage(null)
            }
        }
        getProduct();
    }, []);

    const addToCart = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            const result = await response.json();
            setMessage('Added to cart')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
        <div>
        {error ? (
            <h1>{error}</h1>
        ) : product ? (
            <div>
                <div>
                    <div>
                        <h1>{product.name}</h1>
                        <h5>Description: {product.description}</h5>
                        <h5>Price: {product.price}</h5>
                        <h5>Availibility: {product.available ? "In stock" : "Out of stock"}</h5>
                        <button onClick={addToCart}>Add to cart</button>
                        <button onClick={() => navigate('/catalog')}>All products</button>
                    </div>
                </div>
            </div>
        ) : (
            <h1>Loading ...</h1>
        )}
        </div>
        </>
    )

}

export default SingleProduct;