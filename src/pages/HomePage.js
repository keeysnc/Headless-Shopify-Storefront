import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";

export const Home = () => {
	const { fetchAllProducts, products } = useContext(ShopContext);

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	if (!products) return <div>Loadings...</div>;

	return (
		<div>
			<h1>Homepage</h1>
			{products.map((product) => (
				<p key={product.title}>{product.title}</p>
			))}
		</div>
	);
};
