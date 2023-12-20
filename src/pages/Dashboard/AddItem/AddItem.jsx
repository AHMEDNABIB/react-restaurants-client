import React from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

const AddItem = () => {
    const { register, handleSubmit } = useForm();
        const axiosSecure = useAxiosSecure();
	// console.log(img_hosting_token)
	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append("image", data.image[0]);
		console.log(formData);

		fetch(img_hosting_url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success)
                {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }
                    console.log(newItem)
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                           if (data.data.insertedId) {
                             Swal.fire({
									position: "top-end",
									icon: "success",
									title: `${data.data.name} is added to the menu.`,
									showConfirmButton: false,
									timer: 1500,
								});
                           }
                        });
                }
            });
	};
	return (
		<div className="w-full px-24">
			<SectionTitle
				subHeading="What's new"
				heading="Add an Item"></SectionTitle>

			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-control w-full my-6">
						<label className="label">
							<span className="label-text">Recipe Name*</span>
						</label>
						<input
							type="text"
							placeholder="Recipe Name"
							{...register("name", { required: true })}
							required
							className="input input-bordered w-full"
						/>
					</div>
					<div className="flex gap-6">
						{/* category */}
						<div className="form-control w-full my-6">
							<label className="label">
								<span className="label-text">Category*</span>
							</label>
							<select
								defaultValue="default"
								{...register("category", { required: true })}
								className="select select-bordered w-full">
								<option disabled value="default">
									Select a category
								</option>
								<option value="salad">Salad</option>
								<option value="pizza">Pizza</option>
								<option value="soup">Soup</option>
								<option value="dessert">Dessert</option>
								<option value="drinks">Drinks</option>
							</select>
						</div>

						{/* price */}
						<div className="form-control w-full my-6">
							<label className="label">
								<span className="label-text">Price*</span>
							</label>
							<input
								type="number"
								placeholder="Price"
								{...register("price", { required: true })}
								className="input input-bordered w-full"
							/>
						</div>
					</div>
					{/* recipe details */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Recipe Details</span>
						</label>
						<textarea
							{...register("recipe")}
							className="textarea textarea-bordered h-24"
							placeholder="Bio"></textarea>
					</div>

					<div className="form-control w-full my-6">
						<input
							{...register("image", { required: true })}
							type="file"
							className="file-input w-full max-w-xs"
						/>
					</div>

					<button className="btn">
						Add Item <FaUtensils className="ml-4"></FaUtensils>
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddItem;
