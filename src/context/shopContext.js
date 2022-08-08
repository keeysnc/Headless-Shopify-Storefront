import React, { Component } from "react";
import Client from "shopify-buy";

// create shop context
const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
	domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
	storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

export class ShopProvider extends Component {
	state = {
		product: {},
		products: [],
		checkout: {},
		isCartOpen: false,
		isMenuOpen: false,
	};

	componentDidMount() {
		console.log(client.checkout);
		if (localStorage.checkoutId) {
			this.fetchCheckout(localStorage.checkoutId);
		} else {
			this.createCheckout();
		}
	}

	createCheckout = async () => {
		const checkout = await client.checkout.create();
		localStorage.setItem("checkoutId", checkout.id);
		this.setState({ checkout: checkout });
	};

	fetchCheckout = async (checkoutId) => {
		client.checkout.fetch(checkoutId).then((checkout) => {
			this.setState({ checkout: checkout });
		});
	};

	addItemToCheckout = async () => {};

	removeLineItem = async (lineItemIdToRemove) => {};

	fetchAllProducts = async () => {
		const products = await client.product.fetchAll();
		this.setState({ products: products });
	};

	fetchProductWithHandle = async (handle) => {
		const product = await client.product.fetchByHandle(handle);
		this.setState({ product: product });
	};

	closeCart = async () => {};

	openCart = async () => {};

	closeMenu = async () => {};

	openMenu = async () => {};

	render() {
		console.log("checkout value", this.state.checkout);
		return (
			<ShopContext.Provider
				value={{
					...this.state,
					fetchAllProducts: this.fetchAllProducts,
					fetchProductWithHandle: this.fetchProductWithHandle,
					closeCart: this.closeCart,
					openCart: this.openCart,
					closeMenu: this.closeMenu,
					openMenu: this.openMenu,
					addItemToCheckout: this.addItemToCheckout,
				}}
			>
				{this.props.children}
			</ShopContext.Provider>
		);
	}
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
