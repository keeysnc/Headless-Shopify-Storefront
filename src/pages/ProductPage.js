import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { ShopContext } from "../context/shopContext";

export const ProductPage = () => {
	const { handle } = useParams();
	const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);

	useEffect(() => {
		fetchProductWithHandle(handle);
	}, [fetchProductWithHandle, handle]);

	if (!product.title) return <div>Loading...</div>;
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<div>
				<img src={product.images[0].src} alt={product.title}></img>
			</div>
			<div className="product-details">
				<h1>{product.title}</h1>
				<p>{product.variants[0].price}</p>
				<p>{product.description}</p>
				<div
					className="add-to-cart"
					style={{ background: "gray", padding: "20px", display: "inline-block", color: "white" }}
					onClick={() => addItemToCheckout(product.variants[0].id, 1)}
				>
					Add to Cart
				</div>
			</div>
		</div>
	);
};
