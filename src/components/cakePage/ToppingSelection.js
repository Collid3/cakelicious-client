import React from "react";

const ToppingSelection = ({ topping, setTopping }) => {
	return (
		<div className="topping-selection selection">
			<label htmlFor="topping">Topping</label>

			<select name="topping" id="topping" value={topping} onChange={(e) => setTopping((prev) => ({ ...prev, topping: e.target.value }))}>
				<option value="none" defaultChecked>
					None
				</option>
				<option value="1-number">1 Number (+R50)</option>
				<option value="2-numbers">2 Numbers (+R90)</option>
				<option value="3-numbers">3 Numbers (+R120)</option>
				<option value="4-numbers">4 Numbers (+R180)</option>
			</select>
		</div>
	);
};

export default ToppingSelection;
