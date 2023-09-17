import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const CheckoutAddress = ({ address, setAddress, handleSelect }) => {
	return (
		<div className="address-container">
			<PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: "eg Unit 1, 123 Main Street",
								className: "location-search-input",
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div style={{ color: "white" }}>Loading...</div>}

							{!loading &&
								suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									// inline style for demonstration purpose
									const style = suggestion.active
										? {
												backgroundColor: "#fff",
												cursor: "pointer",
												padding: "5px",
										  }
										: {
												backgroundColor: "rgb(255, 132, 153)",
												color: "white",
												cursor: "pointer",
												padding: "5px",
										  };
									return (
										<div
											key={suggestion.description}
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	);
};

export default CheckoutAddress;
