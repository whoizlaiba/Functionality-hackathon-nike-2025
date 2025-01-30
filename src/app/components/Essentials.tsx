import Link from "next/link";

export default function Essentials() {
  return (
    <main className="m-4">
      {/* Title and Description Section */}
      <div className="flex justify-center items-center flex-col gap-3 p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-center">
          FLIGHT ESSENTIALS
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-5 sm:leading-6 w-full sm:w-[80%] lg:w-[70%] text-center pt-3 pb-2">
          Your built-to-last, all-week wears--but with style only Jordan Brand
          can deliver.
        </p>
        <Link href={"/products"}>
          <button className="rounded-full bg-black px-5 py-2 text-white text-sm sm:text-base lg:text-lg hover:bg-gray-800 transition duration-300">
            Shop
          </button>
        </Link>
      </div>

      <h1 className="font-semibold  flex justify-start md:text-xl sm:text-2xl lg:text-3xl py-5 text-center">
        The Essentials
      </h1>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Image 1 with Button */}
        <Link href={"/products"}>
        <div
          className="relative bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] lg:h-[540px]"
          style={{ backgroundImage: "url('/one.png')" }}
        >
          <button className="absolute bottom-11 left-4 bg-white text-black px-5 py-1 rounded-full text-sm sm:text-base lg:text-lg  transition duration-300">
            Men&apos;s
          </button>
        </div>
        </Link>

        {/* Image 2 */}
        <Link href={"/products"}>
        <div
          className="bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] lg:h-[540px]"
          style={{ backgroundImage: "url('/two.png')" }}
        > </div></Link>

        {/* Image 3 with Button */}
        <Link href={"/products"}>
        <div
          className="relative bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] lg:h-[540px]"
          style={{ backgroundImage: "url('/three.png')" }}
        >
          <button className="absolute bottom-11 left-4 bg-white text-black px-5 py-1 rounded-full text-sm sm:text-base lg:text-lg  transition duration-300">
            Kid&apos;s
          </button>
          
        </div>
        </Link>
      </div>
    </main>
  );
}
