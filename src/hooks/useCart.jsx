import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();
	const { refetch, data: cart = [] } = useQuery({
		queryKey: ["cart", user?.email],
		enabled: !loading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/carts?email=${user.email}`);
			return res.data;
		},
	});

	return [cart, refetch];

	// const { user } = useContext(AuthContext);
	// const { refetch, data: cart=[] } = useQuery({
	// 	queryKey: ["carts", user?.email],
	// 	queryFn: async () => {
	// 		const response = await fetch(`https://react-restaurent-server.onrender.com/carts?email=${user?.email}`);

	// 		return response.json();
	// 	},
	// });

	// return [cart, refetch]
};

export default useCart;
