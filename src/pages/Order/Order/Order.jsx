import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderCoverImg from "../../../assets/shop/banner2.jpg";
import useMenu from "../../../hooks/useMenu";
import Cover from "../../Shared/Cover/Cover";

import { useParams } from "react-router-dom";
import OrderTab from "../OrderTab/OrderTab";
import { Helmet } from "react-helmet-async";

const Order = () => {
	const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
	const { category } = useParams();
	const initialIndex = categories.indexOf(category);
	const [tabIndex, setTabIndex] = useState(initialIndex);
	const [menu] = useMenu();
	const desserts = menu.filter((item) => item.category === "dessert");
	const soup = menu.filter((item) => item.category === "soup");
	const salad = menu.filter((item) => item.category === "salad");
	const pizza = menu.filter((item) => item.category === "pizza");

	return (
		<div>
			<Helmet>
				<title>React Restaurant | Order Food</title>
			</Helmet>
			<Cover img={orderCoverImg} title="Order Food"></Cover>
			<Tabs
				defaultIndex={tabIndex}
				onSelect={(index) => setTabIndex(index)}>
				<TabList className="flex items-center justify-center p-4 ">
					<Tab>Salad</Tab>
					<Tab>Pizza</Tab>
					<Tab>Soup</Tab>
					<Tab>Dessert</Tab>
				</TabList>
				<TabPanel>
					<OrderTab items={salad}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={pizza}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={soup}></OrderTab>
				</TabPanel>
				<TabPanel>
					{" "}
					<OrderTab items={desserts}></OrderTab>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Order;
