"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";



 function getData() {
  const data =  client.fetch('*[_type=="product"]');
  return data;
}

const Sidebar = () => (
  <aside className="hidden md:block w-1/5 p-4 space-y-8">
    {/* Sidebar Title */}
    <h2 className="text-xl font-medium text-slate-800 mb-4">New(500)</h2>

    {/* Categories Section */}

    <div>
      <ul className="space-y-3">
        {[
          "Shoes",
          "Sports Bras",
          "Tops & T-Shirts",
          "Hoodies & Sweatshirts",
          "Jackets",
          "Trousers & Tights",
          "Shorts",
          "Tracksuits",
          "Jumpsuits & Rompers",
          "Skirts & Dresses",
          "Socks",
          "Accessories & Equipment",
        ].map((item, index) => (
          <li
            key={index}
            className="text-slate-800 font-medium leading-tight hover:underline cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Gender Selection Section */}
    <div className="relative border-t border-b border-slate-200 py-4">
      <h3 className="text-lg font-medium mb-3">Gender</h3>
      <div className="space-y-2">
        {["Men", "Women", "Unisex"].map((gender, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={gender.toLowerCase()}
              className="form-checkbox h-4 w-4 text-slate-800 bg-slate-200 border-gray-300 rounded-sm focus:ring-slate-500"
            />
            <label
              htmlFor={gender.toLowerCase()}
              className="ml-2 text-slate-800 font-medium cursor-pointer"
            >
              {gender}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Kids Section */}
    <div className="border-b border-slate-200 py-4">
      <h3 className="text-lg font-medium mb-3">Kids</h3>
      <div className="space-y-2">
        {["Girls", "Boys"].map((kid, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={kid.toLowerCase()}
              className="form-checkbox h-4 w-4 text-slate-800 bg-slate-200 border-gray-300 rounded-sm focus:ring-slate-500"
            />
            <label
              htmlFor={kid.toLowerCase()}
              className="ml-2 text-slate-800 font-medium cursor-pointer"
            >
              {kid}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Shop By Price Section */}
    <div className="border-b border-slate-200 py-4">
      <h3 className="text-lg font-medium mb-3">Shop By Price</h3>
      <div className="space-y-2">
        {["Under ₹2500.00", "₹2501.00 - ₹5000.00"].map((price, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`price-${index}`}
              className="form-checkbox h-4 w-4 text-slate-800 bg-slate-200 border-gray-300 rounded-sm focus:ring-slate-500"
            />
            <label
              htmlFor={`price-${index}`}
              className="ml-2 text-slate-800 font-medium cursor-pointer"
            >
              {price}
            </label>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

type Products = {
  status: string;
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;

  id: number;
  price: number;

  category: string;
  productName: string;
  colors: string;
 
};

const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setProducts(data);
    };
    fetchData();
  }, []);
  {
    console.log(products);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
      {products.map((product: Products) => (
        <div
          key={product.id}
          className="bg-white p-4 flex flex-col "
        >
          <Link href={`/products/${product.id}`}>  
          <div className="w-full h-fit md:h-[348px] lg:h-[348px]  mb-4">
          
            <Image
              src={urlFor(product.image).url()}
              alt={product.productName}
              width={1000}
              height={1000}
                            className=" w-full h-full"
            />
            
          </div>
          <h3 className="text-amber-800  text-[15px]  text-start mb-2">
            {product.status}
          </h3>
          <h3 className="text-[15px] font-semibold text-gray-800  mb-2">
            {product.productName}
          </h3>
          <h3 className="text-gray-500 text-[15px]   mb-2">
            {product.category}
          </h3>
          <h3 className="text-[15px]  text-gray-500  mb-2">
            {product.colors} Colour
          </h3>
          <p className="text-gray-800 text-[15px] font-semibold  mt-2">
           MRP: ₹ {product.price}.00
          </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

const MainPage = () => (
  <div className="flex flex-col md:flex-row">
    {/* Sidebar on the left */}
    <Sidebar />

    {/* Product List */}
    <div className="w-full md:w-4/5 p-4">
      <ProductList />
    </div>
  </div>
);

export default MainPage;
