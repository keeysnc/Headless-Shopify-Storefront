import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { fetchAllProducts, products } = useContext(ShopContext);

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	if (!products) return <div>Loadings...</div>;

	return (
		<div>
			<h1>Homepage</h1>
			<div style={{ display: "flex" }}>
				{products.map((product) => (
					<div>
						<Link to={`/products/${product.handle}`} key={product.id}>
							<img className="product-img" src={product.images[0].src}></img>
							<div className="product-title">{product.title}</div>
							<div className="product-price">{product.variants[0].price}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
