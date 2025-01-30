


import { useContext, useState } from "react";
import { Product } from "./CartProvider";
import { CartContext, CheckoutContext } from "./context";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

import Image from "next/image";
import { AiOutlineLeft } from "react-icons/ai";

const SideCart = () => {
  const { cart, delCart, updateQuantity } = useContext(CartContext);
  const { addCheckout } = useContext(CheckoutContext);
  const [isOpen, setIsOpen] = useState(true); // State to track if the cart is open or closed

  // Close the cart
  const closeCart = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null; // If the cart is closed, return null to hide the component

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total: number, product: Product) =>
      total + product.price * product.quantity,
    0
  );

  // Handle quantity increase/decrease
  const handleQuantityChange = (
    product: Product,
    action: "increase" | "decrease"
  ) => {
    const newQuantity =
      action === "increase" ? product.quantity + 1 : product.quantity - 1;

    // Check if increasing quantity exceeds inventory
    if (action === "increase" && newQuantity > product.inventory) {
      alert("Sorry, this item is out of stock.");
      return; // Prevent increase if quantity exceeds inventory
    }

    updateQuantity(product.id, newQuantity); // Call your context or update logic
  };

  return (
    <div className="fixed top-0 right-0 h-screen bg-white shadow-lg flex flex-col p-4 lg:p-6 z-50 overflow-y-auto w-full sm:w-[350px] md:w-[400px] lg:w-[450px]">
      {/* Arrow Button to Close the Cart */}
      <button
        onClick={closeCart}
        className="absolute left-0 top-6 p-2 text-gray-600 hover:text-gray-800"
      >
        <AiOutlineLeft size={24} /> {/* Arrow Icon */}
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product: Product) => (
            <div
              key={`${product.id}-${product.colors}`} // Ensure each product-color pair is unique
              className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg flex-wrap sm:flex-nowrap"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 ">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center items-center">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.productName}
                    className="rounded-md"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-700">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-700">
                    Quantity: {product.quantity}
                  </p>

                  {/* Display selected color as a colored circle */}
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    Colour:
                    <span>{product.colors}</span>
                  </p>

                  <p className="text-sm text-gray-700">${product.price}</p>

                  {/* Display Stock */}
                  <p className="text-sm text-gray-700">
                    Stock Available: {product.inventory}
                    
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:w-1/4 mt-1">
                    <button
                      onClick={() => handleQuantityChange(product, "decrease")}
                      className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 text-xs text-black"
                      disabled={product.quantity <= 1} // Disable button if quantity is 1
                    >
                      -
                    </button>
                    <span className="text-sm">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product, "increase")}
                      className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 text-xs text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => delCart(product)} // Remove the specific product-color pair
                className="text-red-600 hover:text-red-800 transition-all text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length === 0 ? null : (
        <div className="w-full px-1 py-4 bg-gray-100 rounded-t-xl border-t border-gray-300 mt-auto">
          {/* Display Total Price */}
          <div className="text-lg font-semibold text-gray-800">
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>
        
          <Link href={'/checkout'}><button
                        className="w-full py-2 bg-[#23A6F0] text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => { alert("Proceeding to checkout"); addCheckout(cart); }}
                    >
                        Checkout
                    </button></Link>
        </div>
      )}
    </div>
  );
};
export default SideCart;
