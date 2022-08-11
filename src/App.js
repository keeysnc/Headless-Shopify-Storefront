import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Cart />
			<Routes>
				<Fragment>
					<Route path="/products/:handle" element={<ProductPage />}></Route>
					<Route path="/" element={<Home />}></Route>
				</Fragment>
			</Routes>
		</div>
	);
}

export default App;
