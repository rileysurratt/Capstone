// Single Product page
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1)

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
// product id and quantity in the body of post request
    const addToCart = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: parseInt(quantity) })
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            const result = await response.json();
            setMessage('Added to cart')
        } catch (error) {
            console.log(error)
            setMessage('Error adding to cart')
        }

    }

    return (
        <>
        <div>
        {error ? (
            <h1>{error}</h1>
        ) : product ? (
            <div>
                <Card>
                    <CardContent>
                        <h1>{product.name}</h1>
                        <h5>Description: {product.description}</h5>
                        <h5>Price: {product.price}</h5>
                        <h5>Availibility: {product.quantity > 0 ? "In stock" : "Out of stock"}</h5>
                        <input type="number" label="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                        <button onClick={addToCart}>Add to cart</button>
                        <button onClick={() => navigate('/catalog')}>All products</button>
                        {message && (<p style={{ color: 'green'}}>{message}</p>)}
                    </CardContent>
                </Card>
            </div>
        ) : (
            <h1>Loading ...</h1>
        )}
        </div>
        </>
    )

}

export default SingleProduct;