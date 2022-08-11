import React, { Component } from "react";
import Client from "shopify-buy";

// create shop context
const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
	domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
	storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

/* ShopProvider component holds the following:
1. placeholders for things that will need to be changed or updated - this is stored in state
2. component did mount - hook that checks localstorage for checkoutid everytime the app mounts
		* if checkoutId is found then getCheckout else create a checkout session
3. functions for updating the properties within the state object (async because their all fetching from shopify api )
4. Within the render function - render the StoreProvider and pass in all children that are affected by it
5. On the StoreProvider pass the state (to display it) and the functions (to update state) into the value attribute on StoreProvider 
*/
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

	//
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

	addItemToCheckout = async (variantId, quantity) => {
		const lineItemsToAdd = [
			{
				variantId,
				quantity: parseInt(quantity, 10),
			},
		];

		const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd);

		this.setState({ checkout: checkout });
		this.openCart();
	};

	removeLineItem = async (lineItemIdsToRemove) => {
		// Remove an item from the checkout
		const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove);
		this.setState({ checkout: checkout });
	};

	fetchAllProducts = async () => {
		const products = await client.product.fetchAll();
		this.setState({ products: products });
	};

	fetchProductWithHandle = async (handle) => {
		const product = await client.product.fetchByHandle(handle);
		this.setState({ product: product });
	};

	closeCart = async () => {
		this.setState({ isCartOpen: false });
	};

	openCart = async () => {
		this.setState({ isCartOpen: true });
	};

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
					removeLineItem: this.removeLineItem,
				}}
			>
				{this.props.children}
			</ShopContext.Provider>
		);
	}
}

// Consuming components are components within a provider
// We need this because we are using a class component as our provider.
// You need a consumer component to subscribe to a context within a functional component ( since the provider is a class component )
const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
