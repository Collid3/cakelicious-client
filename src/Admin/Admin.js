import React from "react";
import AdminHome from "./AdminHome";
import AddCake from "./pages/AddCake";
import CakesHome from "./pages/CakesHome";
import EditCake from "./pages/EditCake";
import Orders from "./Orders";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<AdminHome />} />
				<Route path="/cakes/add" element={<AddCake />} />
				<Route path="/cakes/edit/:id" element={<EditCake />} />
				<Route path="/cakes" element={<CakesHome />} />
				<Route path="/orders" element={<Orders />} />
			</Routes>
		</div>
	);
};

export default Admin;
