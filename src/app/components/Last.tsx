

import React from 'react';

export default function Last() {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            {/* Icons Section */}
            <div className="px-4">
              <h2 className="title-font font-bold text-black tracking-widest text-base mb-3">
                Icons
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Air Force 1</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Huarache</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Air Max 90</a>
                </li>
              </nav>
            </div>

            {/* Shoes Section */}
            <div className="px-4">
              <h2 className="title-font font-bold text-black tracking-widest text-base mb-3">
                Shoes
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">All Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Custom Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Running Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Jordan Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Air Max 95</a>
                </li>
              </nav>
            </div>

            {/* Clothing Section */}
            <div className="px-4">
              <h2 className="title-font font-bold text-black tracking-widest text-base mb-3">
                Clothing
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">All Clothing</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Modest Wear</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Hoodies & Pullovers</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Shirts & Tops</a>
                </li>
              </nav>
            </div>

            {/* Kids' Section */}
            <div className="px-4">
              <h2 className="title-font font-bold text-black tracking-widest text-base mb-3">
                Kids&apos;
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Infant & Toddler Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Kids&apos; Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Kids&apos; Jordan Shoes</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800 text-sm">Kids&apos; Basketball Shoes</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}





