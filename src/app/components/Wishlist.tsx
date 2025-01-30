import { useContext, useState } from "react";
import { CartContext } from "./context";
import { AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  colors: string;
  image: string; // Replace with actual type for images
};

const WishList = () => {
  const { wish, delWish, addCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(true); // State to track if the cart is open or closed

  const closeWish = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-screen bg-white shadow-lg p-4 lg:p-6 z-50 overflow-y-auto w-full sm:w-[350px] md:w-[400px] lg:w-[450px]">
      {/* Arrow Button to Close the Cart */}
      <button
        onClick={closeWish}
        className="absolute left-0 top-6 p-2 text-gray-600 hover:text-gray-800"
      >
        <AiOutlineLeft size={24} /> {/* Arrow Icon */}
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Wishlist
      </h2>

      {wish.length === 0 ? (
        <p className="text-center text-gray-500">Wishlist is empty!</p>
      ) : (
        <div className="space-y-4">
          {wish.map((product:Product) => (
            <div
              key={`${product.id}-${product.colors}`} // Ensure each product-color pair is unique
              className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg flex-wrap sm:flex-nowrap"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 ">
                <div className="w-20 h-20 bg-gray-200 rounded-md flex justify-center items-center">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.productName}
                    className="rounded-md"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h3 className="text-base  font-semibold text-gray-700">
                    {product.productName}
                  </h3>

                  {/* Display selected color as a colored circle */}
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    Colour:
                  
                    <span>{product.colors}</span>
                  </p>

                  <p className="text-sm text-gray-700">${product.price}</p>
                  {/* Quantity Controls */}
                </div>
              </div>
              <div className="flex sm:flex-col justify-between sm:justify-start sm:gap-2 mt-2 sm:mt-0 w-full">
                <button
                  onClick={() => addCart(product)}
                  className="text-blue-600 hover:text-blue-800 transition-all text-sm tracking-wider font-semibold "
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => delWish(product)} // Remove the specific product-color pair
                  className="text-red-600 hover:text-red-800 transition-all text-sm  "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;