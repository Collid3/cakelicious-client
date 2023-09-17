import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const QuantitySelection = ({ quantity, setQuantity }) => {
	const addOne = () => {
		setQuantity((prev) => ({ ...prev, quantity: quantity + 1 }));
	};

	const minusOne = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
		setQuantity((prev) => ({ ...prev, quantity: quantity > 1 ? quantity - 1 : quantity }));
	};

	return (
		<div className="quantity">
			<div className="plus" onClick={addOne}>
				<BiPlus />
			</div>

			<input className="quantity" type="Number" name="quantity" id="" title="quantity" value={quantity} onChange={(e) => setQuantity((prev) => ({ ...prev, quantity: e.target.value === "" ? 1 : e.target.value < 1 ? 1 : parseInt(e.target.value) }))} />

			<div className="minus" onClick={minusOne}>
				<BiMinus />
			</div>
		</div>
	);
};

export default QuantitySelection;
