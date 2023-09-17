import "./css/Admin.css";
import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
	return (
		<div className="admin-container">
			<Link to="/" className="corner-button">
				<button>Back to Client</button>
			</Link>
			<h1>Admin Page</h1>

			<div className="admin-navigation">
				<Link to="/admin/orders">
					<div className="Orders">Orders</div>
				</Link>
				<Link to="/admin/requests">
					<div className="Requests">Requests</div>
				</Link>
				<Link to="cakes">
					<div className="Cakes">Cakes</div>
				</Link>
				<Link to="/admin/employees">
					<div className="Users">Employees</div>
				</Link>
				<Link to="/admin/transactions">
					<div className="Users">Transactions History</div>
				</Link>
			</div>
		</div>
	);
};

export default AdminHome;
