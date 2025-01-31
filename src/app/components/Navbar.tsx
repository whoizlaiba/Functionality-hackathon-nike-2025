
"use client"
import { useState, useEffect, useContext } from 'react'
import Image from "next/image"
import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa6"
import { BiShoppingBag } from "react-icons/bi"
import SideCart from "./SideCart";
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { CartContext } from './context'

// Assuming you have an API or a Sanity client to fetch product data
type Products = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  id: number;
  price: number;
  category: string;
  productName: string;
  colors: string;
};

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Products[]>([])
  const [loading, setLoading] = useState(false)
  const { cart } = useContext(CartContext); // Access the cart from context
  const [display, setDisplay] = useState(false);
  const cartItemCount = cart.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  useEffect(() => {
    // If the search term is not empty, we fetch the data
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]) // Clear results if input is empty
        return
      }

      setLoading(true)

      try {
        // Adjust query to search products that start with the typed letter or term
        const query = `*[_type == "product" && productName match '${searchTerm}*']` // Sanity query filtering products alphabetically by name
        const products = await client.fetch(query)

        // Optionally, sort the results alphabetically (if needed)
        const sortedProducts = products.sort((a: Products, b: Products) =>
          a.productName.localeCompare(b.productName)
        )

        setSearchResults(sortedProducts) // Update search results
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    // Debouncing the input
    const timeoutId = setTimeout(() => {
      fetchSearchResults()
    }, 300)  // 300ms debounce delay

    return () => clearTimeout(timeoutId) // Cleanup timeout on every searchTerm change
  }, [searchTerm])

  return (
    <header>
      {/* Top bar */}
      <div className="bg-[#F5F5F5] flex justify-between items-center px-6 py-2 md:text-[11px] sm:text-[9px] text-[8px] font-medium text-gray-500">
        <Image src="/men.png" alt="" width={1000} height={24} className="w-[24px] h-[24px]" />
        <div className="flex md:gap-4 sm:gap-3 gap-2">
          <Link href="#" className="hover:text-gray-800">Find Link Store</Link>
          <Link href="/contact" className="hover:text-gray-800">Help</Link>
          <Link href="/joinus" className="hover:text-gray-800">Join Us</Link>
          <Link href="/signin" className="hover:text-gray-800">Sign In</Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex flex-wrap justify-between items-center px-6 py-4">
        {/* Left section (Logo) */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Nike Logo"
            className="md:w-[78px] sm:w-[60px] w-[30px]"
            width={1000}
            height={30}
          />
        </div>

        {/* Center section (Navigation Links) */}
        <nav className="flex gap-4 md:gap-6 text-gray-700 font-medium md:text-[16px] sm:text-[14px] text-[10px]">
          <Link href="/products" className="hover:text-black whitespace-nowrap">New & Featured</Link>
          <Link href="/products" className="hover:text-black whitespace-nowrap">Men</Link>
          <Link href="/products" className="hover:text-black whitespace-nowrap">Women</Link>
          <Link href="/products" className="hover:text-black whitespace-nowrap">Kids</Link>
          <Link href="/products" className="hover:text-black whitespace-nowrap">Sale</Link>
          <Link href="/products" className="hover:text-black whitespace-nowrap">SNKRS</Link>
        </nav>

        {/* Right section (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
            {/* Show search results if any */}
            {searchTerm && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-[200px] overflow-y-auto mt-2 rounded-md">
                {loading ? (
                  <p className="text-center text-gray-500 py-2">Loading...</p>
                ) : (
                  searchResults.length > 0 ? (
                    <ul className="max-h-[200px] overflow-y-auto">
                      {searchResults.map((product: Products) => (
                        <li key={product.id} className="p-2 hover:bg-gray-100">
                          <Link href={`/products/${product.id}`} className="flex items-center">
                            <Image src={urlFor(product.image).url()} alt={product.productName} width={40} height={40} className="rounded-md mr-2" />
                            <span>{product.productName}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 py-2">No results found</p>
                  )
                )}
              </div>
            )}
          </div>

         
          <FaRegHeart className="text-gray-700 md:h-[24px] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px] cursor-pointer hover:text-black" />
          
             
            <BiShoppingBag className="text-gray-700  md:h-[24px] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px] cursor-pointer hover:text-black"  onClick={() => setDisplay(!display)}/>
            {display && <SideCart />}
              {cartItemCount > 0 && (
                <sup>
                  <div className="absolute top-0 right-0 w-4 h-4  font-semibold text-blue-800 text-xs flex justify-center items-center rounded-full ">
                    {cartItemCount}
                  </div>
                </sup>
              )}

          
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className="block md:hidden px-6 mt-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
          {/* Show search results on mobile as well */}
          {searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-[200px] overflow-y-auto mt-2 rounded-md">
              {loading ? (
                <p className="text-center text-gray-500 py-2">Loading...</p>
              ) : (
                searchResults.length > 0 ? (
                  <ul className="max-h-[200px] overflow-y-auto">
                    {searchResults.map((product: Products) => (
                      <li key={product.id} className="p-2 hover:bg-gray-100">
                        <Link href={`/products/${product.id}`} className="flex items-center">
                          <Image src={urlFor(product.image).url()} alt={product.productName} width={40} height={40} className="rounded-md mr-2" />
                          <span>{product.productName}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 py-2">No results found</p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

