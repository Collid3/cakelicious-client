import React from "react";

const SpongeSelection = ({ sponge, setSponge }) => {
	return (
		<div className="selection" id="sponge-selection">
			<label>Sponge</label>

			<select name="sponge" id="sponge" value={sponge} onChange={(e) => setSponge((prev) => ({ ...prev, sponge: e.target.value }))}>
				<option value="none" defaultChecked>
					Choose an option
				</option>
				<option value="carrot">Carrot</option>
				<option value="chocolate">Chocolate</option>
				<option value="red velvet">Red Velvet</option>
				<option value="vanilla">Vanilla</option>
			</select>
		</div>
	);
};

export default SpongeSelection;
