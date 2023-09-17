import React from "react";
import Cakes from "./Cakes";
import Navigation from "./Navigation";

const Main = () => {
	return (
		<main className="main-container">
			<aside>
				<Navigation />
			</aside>

			<Cakes />
		</main>
	);
};

export default Main;
