import React from "react";
import {
	FaAd,
	FaBook,
	FaCalendar,
	FaHome,
	FaList,
	FaShoppingCart,
	FaUsers,
	FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
	const [cart] = useCart();

	const isAdmin = true;
	return (
		<div>
			<div className="drawer lg:drawer-open">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content here */}
					<Outlet></Outlet>
					<label
						htmlFor="my-drawer-2"
						className="btn btn-primary drawer-button lg:hidden">
						Open drawer
					</label>
				</div>
				<div className="drawer-side   bg-[#D1A054]">
					<label
						htmlFor="my-drawer-2"
						className="drawer-overlay"></label>
					<ul className="menu drawer p-4 w-72">
						{isAdmin ? (
							<>
								<li>
									<NavLink to="/dashboard/adminHome">
										<FaHome></FaHome>
										Admin Home
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/addItems">
										<FaUtensils></FaUtensils>
										Add Items
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/manageItems">
										<FaList></FaList>
										Manage Items
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/bookings">
										<FaBook></FaBook>
										Manage Bookings
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/users">
										<FaUsers></FaUsers>
										All Users
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink to="/dashboard/userHome">
										<FaHome></FaHome>
										User Home
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/reservation">
										<FaCalendar></FaCalendar>
										Reservation
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/cart">
										<FaShoppingCart></FaShoppingCart>
										My Cart ({cart.length})
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/review">
										<FaAd></FaAd>
										Add a Review
									</NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/bookings">
										<FaList></FaList>
										My Bookings
									</NavLink>
								</li>
							</>
						)}
						{/* Shared nav links */}
						<div className="divider"></div>
						<li>
							<NavLink to="/">
								<FaHome></FaHome> Home
							</NavLink>{" "}
						</li>
						<li>
							<NavLink to="/menu"> Our Menu</NavLink>
						</li>
						<li>
							<NavLink to="/order/salad">Order Food</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
