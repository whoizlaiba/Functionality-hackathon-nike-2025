"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutContext } from "./context";
import { Product } from "./CartProvider";

const Checkout = () => {
  const { checkout } = useContext(CheckoutContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [, setFormData] = useState({});

  const totalPrice: number = (checkout || []).reduce(
    (total: number, product: { price: number; quantity: number }) =>
      total + product.price * product.quantity,
    0
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const orderData = Object.fromEntries(data.entries());

    const finalOrderData = {
      ...orderData,
      products: checkout,
      totalAmount: totalPrice,
    };

    setFormData(finalOrderData);

    try {
      const response = await fetch("/api/shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalOrderData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "An unknown error occurred.");
      }

      const shipmentResponse = await response.json();
      setTrackingNumber(shipmentResponse.trackingNumber); // ✅ Tracking number store karein

      alert(
        `Shipment created successfully! Tracking Number: ${shipmentResponse.trackingNumber}`
      );

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Error creating shipment. Please try again.");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {trackingNumber ? (
        <div className="w-1/3 mx-auto my-auto">
          <button
            onClick={() => router.push(`/tracking/SHIPPO_TRANSIT`)}
            className="bg-green-500 text-white py-2 w-full px-4 rounded-md mt-4"
          >
            Track Order
          </button>
          <button
            onClick={() => router.push(`/`)}
            className="bg-blue-500 text-white py-2 w-full px-4 rounded-md mt-4"
          >
            Home Page
          </button>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col md:flex-row  justify-center gap-6">
          <div className="left ">
            <div className=" bg-white p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-y-3 gap-x-5"
              >
                {[
                  {
                    label: "First Name",
                    name: "firstName",
                    type: "text",
                    place: "e.g Olivia",
                  },
                  {
                    label: "Last Name",
                    name: "lastName",
                    type: "text",
                    place: "e.g Carter",
                  },
                  {
                    label: "Street Address",
                    name: "streetAddress",
                    type: "text",
                    place: "e.g 123 Street",
                  },
                  {
                    label: "City",
                    name: "city",
                    type: "text",
                    place: "e.g Karachi",
                  },
                  {
                    label: "ZIP Code",
                    name: "zipCode",
                    type: "text",
                    place: "e.g 12345",
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    place: "Enter Your Email",
                  },
                  {
                    label: "Phone",
                    name: "phone",
                    type: "tel",
                    place: "e.g 01234567891",
                  },
                ].map((field) => (
                  <div key={field.name} className=" flex flex-col gap-1">
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      className="border border-black rounded-md text-sm px-3 py-1"
                      placeholder={field.place}
                    />
                  </div>
                ))}

                {/* ✅ Province Field Uses 2-Letter State Codes */}
                <span className="flex flex-col gap-1">
                  <label htmlFor="">Province</label>
                  <select
                    id="province"
                    name="province"
                    className="border border-black rounded-md text-sm px-3 py-1"
                  >
                    <option value="CA">Sindh</option>
                    <option value="TX">Punjab</option>
                    <option value="NY">Balochistan</option>
                  </select>
                </span>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white col-span-2 py-2 px-4 rounded-md mt-4"
                >
                  {isLoading ? "Placing order..." : "Place order"}
                </button>
              </form>

              {/* ✅ Tracking Button (Only show if trackingNumber exists) */}

              {/* Error Message */}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
          <div className="right mt-2">
            <div className="max-w-md mx-auto bg-white p-7 rounded-md shadow-md">
              <span className="grid grid-cols-4 text-xl justify-center font-bold mb-6">
                <h2 className="col-span-2">Product</h2>
                <h2 className="text-center">Qty</h2>
                <h2 className="text-end">Amount</h2>
              </span>

              {checkout &&
                checkout.map((product: Product) => (
                  <div className="grid grid-cols-4 mb-4 " key={product.id}>
                    <p className="col-span-2">{product.productName}</p>
                    <p className="text-center">{product.quantity}</p>
                    <p className="text-end mr-2">
                      ${product.price * product.quantity}
                    </p>
                  </div>
                ))}
              <div className="flex justify-between mb-4">
                <p className="font-medium">Subtotal</p>
                <p className="mr-2">${totalPrice}</p>
              </div>
              <div className="flex justify-between my-4 border-[1px] py-2 border-y-slate-600 ">
                <p className="font-semibold tracking-wide">Shipping</p>
                <p className="text-gray-600 mr-2">Free</p>
              </div>
              <div className="flex justify-between mb-4 font-bold text-lg">
                <p>Total</p>
                <p className="text-gray-600 mr-2"> ${totalPrice}</p>
              </div>
              <hr className=" border-gray-200" />

              <div className="">
                <div className="flex flex-col gap-1 mb-3">
                  <h2 className="font-medium">Payment Method</h2>
                  <span>
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      checked
                    />
                    <label
                      htmlFor="cashOnDelivery"
                      className="ml-2 text-sm font-medium text-gray-700 "
                    >
                      Cash On Delivery
                    </label>
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="#" className="text-blue-600 underline ">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
