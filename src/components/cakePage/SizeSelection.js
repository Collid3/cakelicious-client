import React from "react";

const SizeSelection = ({ size, setSize }) => {
	return (
		<div className="selection" id="size-selection">
			<label>Size</label>

			<select name="size" id="size" value={size} onChange={(e) => setSize((prev) => ({ ...prev, size: e.target.value }))}>
				<option value="none" defaultChecked>
					Choose an option
				</option>

				<option value="small-15cm" name="">
					Small 15cm [2 layers 6-8 people (3 layer 8-10)]
				</option>

				<option value="medium-20cm">Medium 20cm [2 layers 15-20 people (3 layer 20-25)]</option>

				<option value="large-25cm">Large 25cm (Serves approx 20-24 people)</option>

				<option value="x-large-30cm">Extra large 30cm (Serves approx 35-40 people)</option>
			</select>
		</div>
	);
};

export default SizeSelection;
