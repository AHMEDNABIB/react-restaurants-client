import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckoutForm = ({ price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const [cardError, setCardError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	// console.log(price);

	const [cart, refetch] = useCart();

	const totalPrice = cart.reduce((total, item) => total + item.price, 0);

	console.log(totalPrice);

	useEffect(() => {
		if (totalPrice > 0) {
			axiosSecure
				.post("/create-payment-intent", { price: totalPrice })
				.then((res) => {
					console.log(res.data.clientSecret);
					setClientSecret(res.data.clientSecret);
				});
		}
	}, [axiosSecure, totalPrice]);

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}

		console.log("card", card);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("[error]", error);
			setCardError(error.message);
		} else {
			setCardError("");
			console.log("[PaymentMethod]", paymentMethod);
		}

		setProcessing(true);
		// confirm payment
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || "anonymous",
						name: user?.displayName || "anonymous",
					},
				},
			});

		if (confirmError) {
			console.log("confirm error");
		}

		console.log(paymentIntent);
		setProcessing(false);

		if (paymentIntent.status === "succeeded") {
			console.log("transaction id", paymentIntent.id);
			setTransactionId(paymentIntent.id);

			const payment = {
				email: user.email,
				price: totalPrice,
				transactionId: paymentIntent.id,
				date: new Date(), // utc date convert. use moment js to
				quantity: cart.length,
				cartItems: cart.map((item) => item._id),
				menuItems: cart.map((item) => item.menuItemId),

				itemNames: cart.map((item) => item.name),

				status: "pending",
			};

			axiosSecure.post("/payments", payment).then((res) => {
				refetch();
				if (res.data?.paymentResult?.insertedId) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Thank you for the taka paisa",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
		}
	};
	return (
		<div>
			<form className="w-2/3 m-8" onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button
					type="submit"
					className="btn btn-outline btn-primary btn-sm mt-4 "
					disabled={!stripe || !clientSecret || processing}>
					Pay
				</button>
			</form>

			{cardError && <p className="text-red-600 ml-8">{cardError}</p>}
			{transactionId && (
				<p className="text-green-600">
					{" "}
					Your transaction id: {transactionId}
				</p>
			)}
		</div>
	);
};

export default CheckoutForm;
