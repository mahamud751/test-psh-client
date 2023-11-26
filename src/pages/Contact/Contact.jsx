import React from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Offices from "../../components/contact/Offices";

const Contact = () => {
  return (
    <div className="mt-5">
      <div className="mx-auto max-w-7xl md:px-4  lg:px-8 text-gray-900">
        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-6">
            <div className="">
              <span className="block mb-4 text-base text-primary font-semibold uppercase">
                Contact Us
              </span>
              <h2
                className="
            text-dark
            mb-6
            uppercase
            font-bold
            text-[32px]
            sm:text-[40px]
            lg:text-[36px]
            xl:text-[40px]
            "
              >
                Let’s talk.
              </h2>
              <p className="text-base text-body-color leading-relaxed mb-9">
                Have a question or need assistance? We are here to help! Use the
                contact form below to get in touch with the Project Second Home
                team
              </p>
              <div className="md:flex">
                <button className="contact_btn md:w-[240px] sm:w-[90%]">
                  Call us +880 1234-567890
                </button>
                <button className="contact_btn md:ms-4 md:mt-0 sm:mt-4 md:w-[240px] sm:w-[90%]">
                  Call us +880 1234-567890
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-6">
            <Typography variant="h4" color="blue-gray">
              Contact Us
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              If you have any question about our service . Fill the form below.
              We wll help you
            </Typography>
            <form className="mt-8 mb-2  text-start">
              <div className="md:flex mt-2">
                <div>
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>

                <div className="md:ms-12 sm:my-5 md:my-0">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 mt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Choose topic
                </label>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="my-2">
                  <select
                    className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                    id="grid-state"
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                </div>
              </div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <div className="flex justify-center w-full">
                <button className="contact_btn1 mt-6">Contact Us</button>
              </div>
            </form>
          </div>
        </div>
        <Offices />
      </div>
    </div>
  );
};

export default Contact;
