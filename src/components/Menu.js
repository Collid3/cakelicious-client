import React from "react";
import { useNavigate } from "react-router-dom";
import handleLogout from "./Auth/Logout";
import { GoBook } from "react-icons/go";

const Menu = ({ loggedIn, setMenu, apiWithCred, setAccessToken, setLoggedIn, setAdmin }) => {
	const navigate = useNavigate();

	const gotoSignIn = () => {
		navigate("/signin");
		setMenu(false);
	};

	return (
		<div className={`menu ${loggedIn && "menu-logged"}`}>
			<ul className="signinOut-buttons">
				{loggedIn && <li onClick={(e) => e.preventDefault()}>View Profile</li>}

				<li onClick={() => navigate("/contacts")}>Contact Us</li>

				<li>Events</li>

				<li className="classes-btn" onClick={() => navigate("/classes")}>
					Classes <GoBook />
				</li>

				{!loggedIn ? (
					<li className="signin-btn" onClick={gotoSignIn}>
						Login/Register
					</li>
				) : (
					<li
						className="logout-btn"
						onClick={() =>
							handleLogout(
								apiWithCred,
								setAccessToken,
								setAdmin,
								setLoggedIn,
								navigate,
								setMenu
							)
						}>
						Logout
					</li>
				)}
			</ul>
		</div>
	);
};

export default Menu;
