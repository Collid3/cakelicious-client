import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { CakePageProvider } from "./Context/CakePageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Router>
		<DataProvider>
			<CakePageProvider>
				<App />
			</CakePageProvider>
		</DataProvider>
	</Router>
	// </React.StrictMode>
);
