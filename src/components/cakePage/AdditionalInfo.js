import React from "react";

const AdditionalInfo = ({ additionalInfo, setAdditionalInfo }) => {
	return (
		<div className="additional-info">
			<h2>Additional Info</h2>

			<textarea
				value={additionalInfo}
				onChange={(e) => setAdditionalInfo((prev) => ({ ...prev, additionalInfo: e.target.value }))}
				name="additional-info"
				id="additional-info"
				cols="30"
				rows="8"
				placeholder="Tell us more about how you want your desired cake to be like. Must be 100 characters or less"
				maxLength="100"
			></textarea>
		</div>
	);
};

export default AdditionalInfo;
