import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Secret from "../pages/Shared/Secret/Secret";
import Signup from "../pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Payment from "../pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/menu",
				element: <Menu></Menu>,
			},
			{
				path: "order/:category",
				element: <Order></Order>,
			},
			{
				path: "login",
				element: <Login></Login>,
			},
			{
				path: "signup",
				element: <Signup></Signup>,
			},
			{
				path: "secret",
				element: (
					<PrivateRoute>
						<Secret></Secret>
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		children: [
			{
				path: "userHome",
				element: <UserHome></UserHome>,
			},
			{
				path: "mycart",
				element: <MyCart></MyCart>,
			},
			{
				path: "users",
				element: <AllUsers></AllUsers>,
			},
			{
				path: 'payment',
				element:<Payment></Payment>
			},

			// Admin Route

			{
				path: "adminHome",
				element: (
					<AdminRoute>
						<AdminHome></AdminHome>
					</AdminRoute>
				),
			},
			{
				path: "addItem",
				element: (
					<AdminRoute>
						<AddItem></AddItem>
					</AdminRoute>
				),
			},
			{
				path: "manageItems",
				element: (
					<AdminRoute>
						<ManageItems></ManageItems>
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
