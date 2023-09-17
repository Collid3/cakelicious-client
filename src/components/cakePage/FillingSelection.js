import React from "react";

const FillingSelection = ({ filling, setFilling }) => {
	return (
		<div className="selection" id="filling-selection">
			<label>Filling</label>

			<select name="filling" id="filling" value={filling} onChange={(e) => setFilling((prev) => ({ ...prev, filling: e.target.value }))}>
				<option value="none" defaultChecked>
					Choose an option
				</option>
				<option value="cream cheese">Cream Cheese</option>
				<option value="chocolate buttercream">Chocolate Buttercream</option>
				<option value="vanilla buttercream">Vanilla Buttercream</option>
				<option value="nutella">Nutella</option>
				<option value="strawberry cream">Strawberry Cream</option>
				<option value="ganache">Ganache</option>
			</select>
		</div>
	);
};

export default FillingSelection;
