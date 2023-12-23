import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {
	const { googleSignIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	const handleGoogleSignIn = () => {
		googleSignIn().then((result) => {
			console.log(result.user);
			const userInfo = {
				email: result.user?.email,
				name: result.user?.displayName,
			};

			fetch("https://react-restaurent-server.onrender.com/users", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(userInfo),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "User created successfully.",
							showConfirmButton: false,
							timer: 1500,
						});
						navigate(from, { replace: true });
					}
				});
		});
	};

	return (
		<div>
			<div className="divider"></div>
			<div className="w-full text-center my-4">
				<button
					onClick={handleGoogleSignIn}
					className="btn btn-circle btn-outline">
					<FaGoogle />
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
