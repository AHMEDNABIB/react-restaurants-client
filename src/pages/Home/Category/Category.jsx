import React from "react";

import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";

import SectionTitle from "../../../components/SectionTitle/SectionTitle";



const Category = () => {
	return (
		<section>
			<SectionTitle
				subHeading={"From 11.00am to 10.00pm"}
				heading={"Order Online"}></SectionTitle>

			<Swiper
				slidesPerView={4}
				freeMode={true}
				pagination={{
					clickable: true,
				}}
				modules={[FreeMode, Pagination]}
				className="mySwiper">
				<SwiperSlide>
					<img src={slide1} alt="" />
					<h3 className="text-4xl uppercase text-center -mt-16">
						Salads
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide2} alt="" />
					<h3 className="text-4xl uppercase text-center -mt-16">
						Pizzas
					</h3>
				</SwiperSlide>

				<SwiperSlide>
					<img src={slide3} alt="" />
					<h3 className="text-4xl uppercase text-center -mt-16">
						Soups
					</h3>
				</SwiperSlide>

				<SwiperSlide>
					<img src={slide4} alt="" />
					<h3 className="text-4xl uppercase text-center -mt-16">
						Desserts
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide5} alt="" />
					<h3 className="text-4xl uppercase text-center -mt-16">
						Salads
					</h3>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Category;
