import Link from "next/link";

export default function Featured() {
  return (
    <main className="m-4">
      <div>
        <h1 className="font-semibold text-xl py-5">Featured</h1>
      </div>

      {/* Background Image Section */}
      <div
        className="bg-cover bg-center bg-no-repeat h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh]"
        style={{
          backgroundImage: "url('/people.png')",
        }}
      ></div>

      {/* Text Content Section */}
      <div className="flex flex-col justify-center items-center gap-4 p-6 sm:p-8 md:p-10 lg:p-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-center">
          STEP INTO WHAT FEELS GOOD
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-6 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] text-center pt-3 pb-2">
          Cause everyone should know the feeling of running in that perfect pair.
        </p>
        <Link href={"/products"}>
        <button className="px-6 py-3 text-sm sm:text-base md:text-lg bg-black text-white rounded-full hover:bg-gray-800 transition duration-300">
          Find Your Shoe
        </button>
        </Link>
      </div>
    </main>
  );
}
