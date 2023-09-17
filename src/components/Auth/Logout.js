const handleLogout = async (
	apiWithCred,
	setAccessToken,
	setAdmin,
	setLoggedIn,
	navigate,
	setMenu
) => {
	await apiWithCred.delete("/logout");
	localStorage.removeItem("user");
	setAccessToken("");
	setAdmin(false);
	setLoggedIn(false);
	setMenu(false);
	navigate("/");
};

export default handleLogout;
