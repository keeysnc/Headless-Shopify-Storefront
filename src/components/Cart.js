import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";

export const Cart = () => {
	const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(ShopContext);
	const checkoutBtn = (
		<button>
			<a href={checkout.webUrl}>Checkout</a>
		</button>
	);
	return (
		<div className="cart" onClick={() => closeCart()}>
			{isCartOpen
				? checkout.lineItems &&
				  checkout.lineItems.map((item) => (
						<div>
							<button onClick={() => removeLineItem(item.id)}>Remove</button>
							<div key={item.id} style={{ display: "flex" }}>
								<p>{item.title}</p>
								<img src={item.variant.image.src} />
								<p>{item.variant.price}</p>
							</div>
						</div>
				  ))
				: null}

			{isCartOpen && checkout.lineItems.length !== 0 ? checkoutBtn : null}
		</div>
	);
};
