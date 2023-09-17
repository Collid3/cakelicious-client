import React from "react";
import SizeSelection from "./SizeSelection";
import SpongeSelection from "./SpongeSelection";
import FillingSelection from "./FillingSelection";
import ToppingSelection from "./ToppingSelection";
import AdditionalInfo from "./AdditionalInfo";
import QuantitySelection from "./QuantitySelection";

const CakeForm = ({ setValues, values, addToCart }) => {
	function handleReset() {
		setValues({
			size: "none",
			topping: "none",
			sponge: "none",
			filling: "none",
			additionalInfo: "",
			quantity: 1,
		});
	}

	return (
		<form className="cake-page-form" onSubmit={(e) => e.preventDefault()}>
			<div className="selections">
				<SizeSelection setSize={setValues} />
				<SpongeSelection setSponge={setValues} />
				<FillingSelection setFilling={setValues} />
				<ToppingSelection setTopping={setValues} />
				<AdditionalInfo setAdditionalInfo={setValues} />
			</div>

			<div className="cake-page-submit-form">
				<QuantitySelection quantity={values.quantity} setQuantity={setValues} />

				<button type="submit" onClick={addToCart}>
					Add to Cart
				</button>

				<button onClick={handleReset} type="reset">
					Reset
				</button>
			</div>
			<br />
		</form>
	);
};

export default CakeForm;
