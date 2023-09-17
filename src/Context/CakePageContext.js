import { createContext, useState } from "react";

const CakePageContext = createContext({});

export const CakePageProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({
		size: "none",
		topping: "none",
		sponge: "none",
		filling: "none",
		additionalInfo: "none",
		quantity: 1,
	});

	return (
		<CakePageContext.Provider
			value={{
				values,
				setValues,
				loading,
				setLoading,
			}}>
			{children}
		</CakePageContext.Provider>
	);
};

export default CakePageContext;
