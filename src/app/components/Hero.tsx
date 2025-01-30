import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex justify-center flex-col items-center bg-[#fafafa] m-4  ">
      <div className="flex justify-center flex-col items-center pb-4">
        <h3
          className="text-xl text-black font-bold font-[
Helvetica-Neue]"
        >
          Hello Nike App
        </h3>
        <p className="text-sm text-gray-600 ">
          <span>Download the app to access everything Nike.</span>
          <Link
            href={"https://www.nike.com/nike-app"}
            className="underline font-semibold"
          >
            {" "}
            Get Your Great
          </Link>
        </p>
      </div>

      <div
        style={{
          backgroundImage: "url('/picshoe.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "95%",
        }}
      ></div>

      <div
        className="flex justify-center items-center flex-col p-10 text-center
            "
      >
        <p className="text-sm text-black">First Look</p>
        <h2 className=" text-4xl font-bold uppercase text-black">
          Nike Air Max Pulse
        </h2>
        <p
          className="text-sm leading-5 w-full pt-3 pb-2 text-center
                lg:w-[60%] text-black "
        >
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max
          Pulse —designed to push you past your limits and help you go to the
          max.
        </p>
        <div className="flex justify-center items-center gap-3">
          <Link href={"/products"}>
            <button className="rounded-full py-2 bg-black px-6 text-white ">
              Netlify Me
            </button>
          </Link>
          <Link href={"/products"}>
            {" "}
            <button className="rounded-full py-2 text-white bg-black px-6">
              Shop Air Max
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
