import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
	const { refetch, data: users = [] } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await fetch("http://localhost:5000/users");

			return response.json();
		},
	});

	const handleDeleteUser = (user) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/users/${user._id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							refetch();
							Swal.fire(
								"Deleted!",
								"Your file has been deleted.",
								"success"
							);
						}
					});
			}
		});
	};

	const handleMakeAdmin = (user) => {
		fetch(`http://localhost:5000/users/admin/${user._id}`, {
			method: "PATCH",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					refetch();
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: `${user.name} is an Admin Now!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};

	return (
		<div className="w-full">
			<Helmet>
				<title>Bistro Boss | Login</title>
			</Helmet>
			<div className="flex justify-evenly my-4">
				<h2 className="text-3xl">All Users</h2>
				<h2 className="text-3xl">Total Users: {users.length}</h2>
			</div>

			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<th>{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.role === "admin" ? (
										"Admin"
									) : (
										<button
											onClick={() =>
												handleMakeAdmin(user)
											}
											className="btn btn-lg bg-orange-500">
											<FaUsers
												className="text-white 
                                        text-2xl"></FaUsers>
										</button>
									)}
								</td>
								<td>
									<button
										onClick={() => handleDeleteUser(user)}
										className="btn btn-lg bg-red-500 text-white">
										<FaTrashAlt></FaTrashAlt>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
