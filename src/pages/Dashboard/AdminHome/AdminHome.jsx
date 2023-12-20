import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth()
     const axiosSecure = useAxiosSecure();

		const { data: stats = {} } = useQuery({
			queryKey: ["admin-stats"],
			queryFn: async () => {
				const res = await axiosSecure.get("/admin-stats");
				return res.data;
			},
		});
    return (
		<div className="-mt-10">
			<h3 className='text-center text-4xl text-semibold'>Hi {user.displayName}</h3>
			<div className="stats shadow">
				

				<div className="stat">
					<div className="stat-figure text-secondary">
						<FaUsers className="text-3xl"></FaUsers>
					</div>
					<div className="stat-title">Users</div>
					<div className="stat-value">{stats.users}</div>
					
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary">
						<FaBook className="text-3xl"></FaBook>
					</div>
					<div className="stat-title">Menu Items</div>
					<div className="stat-value">{stats.menuItems}</div>
					
				</div>

				
			</div>
		</div>
	);
};

export default AdminHome;