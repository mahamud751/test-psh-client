import React from "react";
import "./Custom.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div>
        <div style={{ background: "linear-gradient(to right, #000, #061c34)" }}>
          <div
            className=" "
            style={{
              background: "linear-gradient(to right, #070e1b, #07182b)",
            }}
          >
            <div className="dark:text-gray-300 custom-container">
              <ul className="py-4 grid md:grid-cols-6">
                <li className=" col-span-1">
                  <div className="md:flex">
                    <div className="sm:flex sm:justify-center sm:mb-2">
                      <i className="fa-solid fa-envelope md:text-2xl text-white"></i>
                    </div>
                    <div className="text-start ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Email Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">
                        helo@raynative.com
                      </h5>
                    </div>
                  </div>
                </li>

                <li className=" col-span-1">
                  <div className="md:flex">
                    <div className="sm:flex sm:justify-center sm:mb-2">
                      <i className="fa-solid fa-phone text-white md:text-2xl"></i>
                    </div>
                    <div className="text-start ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Phone Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">
                        08147758883, 08100591556
                      </h5>
                    </div>
                  </div>
                </li>

                <li className="col-span-1">
                  <div className="md:flex sm:mr-4">
                    <div className="sm:flex sm:justify-center sm:mb-2">
                      <i className="fa-brands fa-whatsapp md:text-3xl text-white "></i>
                    </div>
                    <div className="text-start md:ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Whatsapp Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">08147758883</h5>
                    </div>
                  </div>
                </li>

                <li className="col-span-3 sm:p-2 md:p-0 ">
                  <form className="flex">
                    <input
                      className="rounded md:px-4 sm:py-3 border-t md:w-full outline-0 sm:w-full"
                      placeholder="your@mail.com"
                    />
                    <button className="ml-1 rounded bg-[#FEBD59] font-bold md:p-4 uppercase border-yellow-500 border-t border-b border-r p-2 ">
                      Subscribe
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <footer className="pt-4 pb-8 xl:pt-8 custom-container sm:p-5 ">
            <div className="  dark:text-gray-300">
              <ul className="flex flex-wrap justify-center pb-8 text-lg font-light">
                <li className="w-1/2 md:w-1/3 lg:w-1/5">
                  <div className="text-start">
                    <h2 className="text-white dark:text-gray-200 text-md mb-4">
                      About PSH
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Our Story</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Our Team</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Our Service</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Testimonials</a>
                      </li>
                      <Link to={"/terms"}>
                        <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                          <a>Terms & Conditions</a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="w-1/2 md:w-1/3 lg:w-1/5">
                  <div className="text-start">
                    <h2 className="text-white dark:text-gray-200 text-md uppercase mb-4">
                      Rooms Category
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Standard Room</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Deluxe Room</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Executive Room</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Premium Room</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Family Room</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="w-1/2 md:w-1/3 lg:w-1/5">
                  <div className="text-start">
                    <h2 className="text-white dark:text-gray-200 text-md uppercase mb-4">
                      Bookings
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Book Now</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Room Availability</a>
                      </li>
                      <Link to="/privacy">
                        <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                          <a>Reservation Policies</a>
                        </li>
                      </Link>
                      <Link to={"/promo"}>
                        <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                          <a>Discount and Offers</a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="w-1/2 md:w-1/3 lg:w-1/5">
                  <div className="text-start">
                    <h2 className="text-white dark:text-gray-200 text-md uppercase mb-4">
                      Office Location{" "}
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Dhanmondi</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Mirpur</a>
                      </li>

                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a>Banani</a>
                      </li>

                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Gulsan</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="w-1/2 md:w-1/3 lg:w-1/5">
                  <div className="text-start">
                    <h2 className="text-white dark:text-gray-200 text-md uppercase mb-4">
                      Connect with us
                    </h2>
                    <div className="flex mx-auto">
                      <i className="fa-brands fa-youtube text-white text-3xl"></i>
                      <i className="fa-brands fa-facebook text-white text-3xl mx-5"></i>
                      <i className="fa-brands fa-linkedin text-white text-3xl"></i>
                      <i className="fa-brands fa-twitter text-white text-3xl ms-5"></i>
                    </div>
                    <div className="mt-12 sm:w-full">
                      <img src="https://i.ibb.co/Pg69RP3/app.png" alt="" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </footer>
          <div
            className="text-center flex items-center justify-center text-white py-3"
            style={{
              background: "linear-gradient(to right, #020304, #071e37)",
            }}
          >
            Copyright © 2023 Project Second Home. All rights reserved
          </div>
        </div>
      </div>
      <MessengerCustomerChat
        pageId="103815078546069"
        appId=" 570469815108233"
      />
    </div>
  );
};

export default Footer;
