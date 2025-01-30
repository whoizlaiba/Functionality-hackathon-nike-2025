





import { AiOutlineSearch } from 'react-icons/ai'; 
import Link from 'next/link';
import Image from 'next/image';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';

const Contactus = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <h2 className="uppercase text-3xl font-bold mt-8 text-black">Get Help</h2>
      
      {/* Search Bar */}
      <div className="flex px-4 py-3 rounded-md w-full md:w-[40%] lg:w-[30%] border-2 border-gray-200 mt-4 justify-between">
        <input className="focus-visible:outline-none w-[80%] sm:w-[85%]" type="text" placeholder="What can we help you with?" ></input>
        <AiOutlineSearch className="w-6 h-6 text-gray-400" />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 px-8 md:px-16 py-8 bg-white text-gray-800 w-full">
        
        {/* Left Section */}
        <div className="col-span-1 md:col-span-9 border-r-[1.3px] pr-4 border-text-secondary-gray">
          <h2 className="text-2xl font-bold mb-4">
            WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?
          </h2>
          <p className="mb-4">
            We want to make buying your favourite Nike shoes and gear online fast and easy, and we accept the following payment options:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</li>
            <li>If you enter your PAN information at checkout, you&#39;ll be able to pay for your order with PayTM or a local credit or debit card.</li>
            <li>Apple Pay</li>
          </ul>
          <p className="mb-6">
            <Link href="#" className="underline font-semibold">
              Nike Members
            </Link>{" "}
            can store multiple debit or credit cards in their profile for faster checkout. If you&#39;re not already a Member,{" "}
            <Link href="#" className="underline font-semibold">
              join us
            </Link>{" "}
            today.
          </p>
          
          {/* Buttons */}
          <div className="flex mt-4 gap-4 jsm:ustify-center justify-start">
            <button className="rounded-full py-2 bg-black px-6 text-white ">Join Us</button>
            <button className="rounded-full py-2 text-white bg-black px-6">Shop Nike</button>
          </div>

          {/* FAQs Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">FAQs</h3>
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-2">Does my card need international purchases enabled?</h4>
              <p>Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled.</p>
              <p className="mt-2 text-sm text-gray-600">Please note, some banks may charge a small transaction fee for international orders.</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-2">Can I pay for my order with multiple methods?</h4>
              <p>No, payment for Nike orders can&#39;t be split between multiple payment methods.</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-2">What payment method is accepted for SNKRS orders?</h4>
              <p>You can use any accepted credit card to pay for your SNKRS order.</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-2">Why don&#39;t I see Apple Pay as an option?</h4>
              <p>To see Apple Pay as an option in the Nike App or on Nike.com, you&#39;ll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, you&#39;ll need to use Safari to use Apple Pay on Nike.com.</p>
            </div>

            {/* Was this answer helpful */}
            <div className="mb-6">
              <p className="mb-2">Was this answer helpful?</p>
              <div className="flex space-x-2">
                <IoIosThumbsUp className="w-6 h-6 cursor-pointer" />
                <IoIosThumbsDown className="w-6 h-6 cursor-pointer" />
              </div>
            </div>

            {/* Related Links */}
            <h4 className="text-lg font-bold mt-8 mb-4 text-text-secondary-gray">RELATED</h4>
            <ul className="space-y-2 ml-6">
              <li>
                <Link href="#" className="underline font-bold">
                  WHAT ARE NIKE&#39;S DELIVERY OPTIONS?
                </Link>
              </li>
              <li>
                <Link href="#" className="underline font-bold">
                  HOW DO I GET FREE DELIVERY ON NIKE ORDERS?
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Right Section (Contact Us) */}
        <div className="col-span-1 md:col-span-3 space-y-9 mt-8 md:mt-0">
          <h2 className="uppercase font-bold text-xl text-center">Contact Us</h2>

          {/* Phone Section */}
          <div className="flex flex-col items-center text-center text-base">
            <Image src="/mobile.png" width={100} height={100} className="w-[64px] h-[64px]" alt="phone icon" />
            <p className="font-semibold text-sm">000 800 919 0566</p>
            <p className="text-sm">Products & Orders: 24 hours a day, 7 days a week</p>
            <p className="text-sm">Company Info & Enquiries: 07:30 - 16:30, Monday - Friday</p>
          </div>

          {/* Message Section */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src="/msg.png" width={100} height={100} className="w-[64px] h-[64px]" alt="message icon" />
            <p className="text-sm">24 hours a day</p>
            <p className="text-sm">7 days a week</p>
          </div>

          {/* Email Response */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src="/env.png" width={100} height={100} className="w-[64px] h-[64px]" alt="envelope icon" />
            <p className="text-sm">We&#39;ll reply within</p>
            <p className="text-sm">five business days</p>
          </div>

          {/* Store Locator */}
          <div className="flex flex-col items-center space-y-2 text-center text-sm">
            <Image src="/loc.png" width={100} height={100} className="w-[64px] h-[64px]" alt="location icon" />
            <p className="font-semibold text-sm">STORE LOCATOR</p>
            <p className="text-sm">Find Nike retail stores near you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;













