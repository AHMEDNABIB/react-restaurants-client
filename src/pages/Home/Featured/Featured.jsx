import React from 'react';

import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import featuredImg from "../../../assets/home/featured.jpg"

import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle subHeading="check it out" heading="Featured Item"></SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-50'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Dec 14, 2023</p>
                    <p className="uppercase">Where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem ipsa officia explicabo sunt obcaecati consequuntur illo tempore minus est, placeat ab voluptate quo voluptatum, quod quas laboriosam maiores fuga consequatur illum nesciunt quasi sint facere. Ab totam natus ex sit, ducimus vel veniam sequi, quod iure odio, explicabo commodi!</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-4 '>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;