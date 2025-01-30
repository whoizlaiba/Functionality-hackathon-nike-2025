"use client";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";

import { data } from "@/app/components/data";
import { urlFor } from "@/sanity/lib/image";
import { useContext, useState } from "react";

import { Product } from "@/app/components/CartProvider";
import { CartContext } from "@/app/components/context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductDetail(props: any) {
  const Id = props.params.productdetails;
  const { addCart, cart, addWish } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const post = data.find((products: Product) => products.id == Id);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Check if the quantity in cart exceeds the available inventory
  const cartQuantity = cart
    .filter((product: Product) => product.id === post.id)
   
    .reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (total: any, product: { quantity: any }) => total + product.quantity,
      0
    );

  const handleAddToCart = () => {
    if (cartQuantity >= post.inventory) {
      // If the cart quantity matches the inventory, show the popup
      setShowPopup(true);
    } else {
      // Add product to cart
      addCart(post);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mx-auto px-4 flex flex-col justify-center gap-8 lg:flex-row lg:gap-16 font-Montserrat">
      {/* Left Section - Image */}
      <div className="flex justify-center">
        <Image
          src={urlFor(post.image).url()} // Assuming img is the image URL field
          alt={post.productName}
          className="w-auto h-auto max-w-full max-h-[300px] sm:max-h-[450px]"
          height={100}
          width={1000}
        />
      </div>

      {/* Right Section - Product Details */}
      <div className="flex flex-col items-center lg:w-[600px] sm:items-start lg:justify-start">
        {/* Product Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center lg:text-left lg:justify-start">
          {post.productName}
        </h1>

        {/* Description */}
        <p className="text-gray-700 mt-4 text-center lg:text-left">
          {post.description}
        </p>

        {/* Category */}
        <p className="text-gray-700 mt-4 text-center lg:text-left">
          <span className="font-bold text-black">Category&nbsp;:&nbsp;</span>
          {post.category}
        </p>

        {/* Inventory */}
        <p className="text-gray-700 mt-4 text-center lg:text-left">
          <span className="font-bold text-black">Inventory&nbsp;:&nbsp;</span>
          {post.inventory}
        </p>

        {/* Status */}
        <p className="text-gray-700 mt-4 text-center lg:text-left">
          <span className="font-bold text-black">Status&nbsp;: &nbsp;</span>
          {post.status}
        </p>

        {/* Color */}
        <p className="text-gray-700 mt-4 text-center lg:text-left">
          <span className="font-bold text-black">Colour&nbsp;:&nbsp; </span>
          {post.colors}
        </p>

        {/* Price */}
        <p className="text-3xl font-Montserrat uppercase font-bold text-black mt-4 lg:justify-start">
          ₹ {post.price}.00
        </p>

        {/* Add to Cart Button with Heart Icon */}
        <div className="flex items-center justify-center gap-3 lg:justify-start w-40 my-6">
          <button
            className="flex items-center w-full sm:w-[150px] justify-center gap-3 bg-black text-white font-medium py-2 rounded-[30px] hover:bg-gray-700 transition-colors mt-4 sm:mt-0"
            onClick={handleAddToCart}
            disabled={cartQuantity >= post.inventory}
          >
            Add To Cart
          </button>

          {/* Heart Icon */}
          <FaHeart
            className="text-black inline md:h-[24px]  sm:w-[30px] sm:h-[20px] w-[30px] h-[30px]   cursor-pointer hover:text-gray-700"
            onClick={() => addWish(post)}
          />
        </div>
      </div>

      {/* Popup for Inventory Alert */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-red-600">Out of Stock!</h2>
            <p className="mt-4 text-gray-700">
              You cannot add more of this product to your cart as it exceeds the
              available inventory.
            </p>
            <div className="mt-6">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
