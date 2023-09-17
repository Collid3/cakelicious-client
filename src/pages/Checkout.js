import React, { useState } from "react";
import CheckoutAddress from "../components/CheckoutAddress";

const Checkout = () => {
	const [address, setAddress] = useState("");

	const handleSelect = async (value) => {
		setAddress(value);
	};

	return (
		<div className="checkout-main-container">
			<header>
				<h4>Logo</h4>

				<section>Cart</section>
			</header>

			<br />

			<h1>CHECKOUT</h1>

			<div className="checkout-container">
				<section className="checkout-container-left">
					<div className="delivery-details">
						<form onSubmit={(e) => e.preventDefault()}>
							<h2>Delivery Address</h2>

							<br />

							<br />

							<section>
								<div>
									<h4 htmlFor="">Email Address</h4>
									<input type="text" placeholder="e.g address123@gmail.com" />
								</div>

								<div>
									<h4 htmlFor="">Full Name</h4>
									<input type="text" />
								</div>

								<div>
									<h4 htmlFor="">Last Name</h4>
									<input type="text" />
								</div>

								<div>
									<h4>Delivery Address</h4>
									<CheckoutAddress
										address={address}
										setAddress={setAddress}
										handleSelect={handleSelect}
									/>

									<input type="text" />
								</div>

								<div>
									<h4>Suburb/Town</h4>

									<input type="text" />
								</div>

								<div>
									<h4>Postal Code</h4>

									<input
										type="text"
										placeholder="e.g 0000"
										style={{ width: "30%" }}
									/>
								</div>

								<div>
									<h4>Phone Number (optional)</h4>

									<input type="text" placeholder="e.g 071 123 4567" />
								</div>

								<button>Place Order</button>
							</section>
						</form>
					</div>
				</section>

				<section className="checkout-container-right">
					<h2>Checkout Right</h2>
				</section>
			</div>
		</div>
	);
};

export default Checkout;
