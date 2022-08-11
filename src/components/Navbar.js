import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";

export const Navbar = () => {
	const { openCart, openMenu, checkout } = useContext(ShopContext);

	return (
		<nav>
			<p>Open Menu</p>
			<p>Logo</p>
			<p onClick={() => openCart()}>Cart Icon</p>
		</nav>
	);
};
