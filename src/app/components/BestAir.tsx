


"use client";
import { urlFor } from '@/sanity/lib/image';
import React, { useState, useEffect, useRef } from 'react';
import client from '../../../sanityClient';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productName: any;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;
  category: string;

  
  description: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

const BestAir: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch products from Sanity
    client
      .fetch(`*[_type == "product"]{id, status, category, productName, description, price, image}`)
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // The amount of scroll per click
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
      } else if (direction === 'right') {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="w-full overflow-hidden relative">
      <h1 className="font-semibold md:text-xl sm:text-2xl lg:text-3xl text-start">
        Best of Air Max
      </h1>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-4"
          >
            <Link href={`/products/${product.id}`}>  
<Image
              src={urlFor(product.image).url()}
              alt={product.productName}
              className="h-48 w-full object-cover rounded-lg"
              width={1000}
              height={100}
              
            />
            <br></br>
            <p className="text-sm font-semibold mt-2 text-black inline">{product.productName}</p>
            <p className="text-sm font-semibold  ">₹{product.price}</p>
            <p className="text-gray-600 text-sm">{product.category}</p>
            </Link>
          </div>
        ))}
      </div>

     
      <button
        onClick={() => scroll('left')}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10094;
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default BestAir;
﻿
