import React, { useContext, useState } from "react";
import "./PersonalInfo.css";

import cashImg from "../../assets/img/Cash-1.png";

import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import promoIcon from "../../assets/img/coupon.png";
import { useNavigate } from "react-router";

import withReactContent from "sweetalert2-react-content";

import { AuthContext } from "../../contexts/UserProvider";
import Swal from "sweetalert2";

import "../Payment/PaymentToggle.css";
import MobileBanking from "../Payment/MobileBanking";
import CashOn from "../Payment/CashOn";
import CreditCard from "../Payment/CreditCard";
import BankTransfer from "../Payment/BankTransfer";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useBranch from "../../hooks/useBranch";

const PersonalInfo = () => {
  const [bookingItem, setBookingItem] = useState({});

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(bookingItem?.rentDate?.bookStartDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  //cart
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  // Payment option manage

  const [showMobile, setShowMobile] = useState(true);
  const [showPaymentArrive, setShowPaymentArrive] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [bookingExtend, setBookingExtend] = useState(false);

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  let toggleClassCheck1 = isActive1 ? "active" : "";
  let toggleClassCheck2 = isActive2 ? "active" : "";
  let toggleClassCheck3 = isActive3 ? "active" : "";
  let toggleClassCheck4 = isActive4 ? "active" : "";

  // Booking Manage
  const navigate = useNavigate();

  // find branch
  const [allBranch] = useBranch();
  const branch = allBranch?.find(
    (branch) => branch?._id === bookingItem?.branch
  );
  useEffect(() => {
    const bookingItem = localStorage.getItem("bookingItem");
    if (bookingItem) {
      const parseToJson = JSON.parse(localStorage.getItem("bookingItem"));
      setBookingItem(parseToJson);
    }
  }, []);

  // ?

  const [image, setImage] = useState([]);

  const [gardianImg, setGardianImg] = useState([]);
  // anchorClickHandler
  const anchorClickHandler = (e) => {
    e.preventDefault();
    const hash = e.target.getAttribute("href").split("#")[1];
    if (hash === "") return false;

    const targetElement = document.getElementById(hash);
    if (targetElement) {
      const navbarHeight =
        document.querySelector(".navbar_sticky").offsetHeight;
      const targetOffsetTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    }
  };
  const bookingOrder = async (e) => {
    e.preventDefault();

    const fatherName = e.target.fatherName.value;
    const motherName = e.target.motherName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const gender = e.target.gender.value;
    const birthDate = e.target.birthDate.value;
    const emergencyContactName = e.target.ecName.value;
    const emergencyRelationC = e.target.ecRelation.value;
    const emergencyContact = e.target.ecNumber.value;
    const employeeStatus = e.target.employeeStatus.value;
    const emplyeeIncome = e.target.emplyeeIncome.value;
    const nid = e.target.nid.value;
    const passport = e.target.passport.value;
    const arrivalTime = e.target.arrivalTime.value;
    const request = e.target.request.value;
    const paymentType = e.target?.payment?.value;
    const bkashNumber = e.target?.bkashNumber?.value;
    const bkashTrx = e.target?.bkashTrx?.value;
    const nagadNumber = e.target?.nagadNumber?.value;
    const nagadTrx = e.target?.nagadTrx?.value;
    const dutchNumber = e.target?.dutchNumber?.value;
    const dutchTrx = e.target?.dutchTrx?.value;
    const receivedTk = 0;
    const totalReceiveTk = 0;
    const paymentStatus = "Unpaid";

    const formData = new FormData();

    // image Verify check
    const isValidFileUploaded = (file) => {
      const validExtensions = [
        "png",
        "jpeg",
        "jpg",
        "PNG",
        "JPG",
        "jpeg",
        "JPEG",
      ];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    // Customer Nid
    if (image?.length > 1) {
      return toast.error("please provide 1 Nid File");
    }
    const file = image[0];
    if (file.size > 5000000) {
      return toast.error("NID size 5MB more than not allowed");
    } else {
      if (isValidFileUploaded(file)) {
        Array.from(image).forEach((item) => {
          formData.append("image", item);
        });
      } else {
        return toast.error("NID is not valid");
      }
    }

    // Gardian Image
    if (gardianImg.length > 1) {
      return toast.error("please provide one pdf file");
    }

    const gardinaNid = gardianImg[0];

    if (gardinaNid.size > 5000000) {
      return toast.error("File size 5MB more than not allowed");
    } else {
      if (isValidFileUploaded(gardinaNid)) {
        Array.from(gardianImg)?.forEach((item) => {
          formData.append("gardianImg", item);
        });
      } else {
        return toast.error("Gardian file is not valid");
      }
    }

    // Booking Data Append

    formData.append("bookingInfo", JSON.stringify(bookingItem));
    formData.append("fullName", user?.firstName);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("userId", user?._id);
    formData.append("email", user?.email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate);
    formData.append("emergencyContactName", emergencyContactName);
    formData.append("emergencyRelationC", emergencyRelationC);
    formData.append("emergencyContact", emergencyContact);
    formData.append("employeeStatus", employeeStatus);
    formData.append("emplyeeIncome", emplyeeIncome);
    formData.append("nid", nid);
    formData.append("passport", passport);
    formData.append("arrivalTime", arrivalTime);
    formData.append("request", request);
    formData.append("paymentType", paymentType);
    formData.append(
      "paymentNumber",
      bkashNumber
        ? bkashNumber
        : "" || nagadNumber
        ? nagadNumber
        : "" || dutchNumber
        ? dutchNumber
        : ""
    );
    formData.append(
      "transactionId",
      bkashTrx
        ? bkashTrx
        : "" || nagadTrx
        ? nagadTrx
        : "" || dutchTrx
        ? dutchTrx
        : ""
    );

    formData.append("receivedTk", receivedTk);
    formData.append("totalAmount", bookingItem?.totalAmount);
    formData.append("totalReceiveTk", totalReceiveTk);
    formData.append("dueAmount", bookingItem?.totalAmount - totalReceiveTk);
    formData.append("paymentStatus", paymentStatus);
    formData.append("bookingExtend", bookingExtend);

    // save order information to the database
    try {
      await axios.post("http://localhost:5001/api/order", formData);
      MySwal.fire({
        icon: "success",
        title: "Order successfully done",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("bookingItem");
      localStorage.removeItem("seatItem");

      navigate("/booking-now");
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  // const [apiKey] = useState('YOUR_IMG_BB_API_KEY');

  // const handleImageUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   try {
  //     const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
  //     const uploadedImage = response.data.data.image;
  //     // Handle the uploaded image URL as needed
  //     console.log(uploadedImage.url);
  //   } catch (error) {
  //     // Handle errors
  //     console.error(error);
  //   }
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     handleImageUpload(file);
  //   }
  // };

  return (
    <form onSubmit={bookingOrder}>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  custom-container mb-20">
        <div className="p-5">
          <h2 className="text-black flex justify-left font-bold mt-5">
            Please Fill this information{" "}
          </h2>
          <div>
            <p className="text-black flex justify-left mt-5 font-bold">
              User Information
            </p>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  placeholder="Your Full Name *"
                  type="text"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="firstName"
                  defaultValue={user ? user.firstName : ""}
                  required
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  placeholder="Your Father Name *"
                  type="text"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="fatherName"
                  required
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  placeholder="Your Mother Name *"
                  type="text"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="motherName"
                  required
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>

              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  type="email"
                  placeholder="Email *"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="email"
                  required
                  defaultValue={user ? user.email : ""}
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>

              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <select
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                  name="gender"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  type="text"
                  placeholder="Phone Number *"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="phone"
                  required
                  defaultValue={user ? user.phone : ""}
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>

              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  type="date"
                  placeholder="Date of Birth *"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="birthDate"
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  type="text"
                  placeholder="NID *"
                  className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  name="nid"
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                  // required
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 sm:col-span-2">
                <input
                  type="text"
                  placeholder="if you have Passport "
                  className="text-black personal-info rounded lg:w-[718px] md:w-[300px] sm:w-full"
                  name="passport"
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 sm:col-span-2">
                <textarea
                  placeholder="Details Address *"
                  className="text-black personal-info rounded lg:w-[718px] md:w-[300px] sm:w-full"
                  name="address"
                  defaultValue={user ? user.address : ""}
                  cols="20"
                  rows="3"
                  maxLength={100}
                  style={{
                    padding: "2px 10px",
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            {/* Uplaod User Id card */}
            <p className="text-black flex justify-left mt-5 font-bold">
              User Verifiacation
            </p>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
              <div>
                <select className="personal-info lg:w-[350px] md:w-[300px] sm:w-full h-[45px] rounded">
                  <option>National Id Card</option>
                  <option>Passport</option>
                  <option>Driving Licence</option>
                  <option>Birth Certificate</option>
                </select>
              </div>
              <div>
                <input
                  multiple
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
                  type="file"
                  className="mt-2 personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                  required
                  name="image"
                  id=""
                />
              </div>
            </div>

            {/* Emargency Details */}
            <p className="text-black flex justify-left mt-5 font-bold">
              Gardian details
            </p>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
              <div>
                <input
                  placeholder="Gardian Contact Name *"
                  type="text"
                  className="text-black personal-info rounded"
                  name="ecName"
                  style={{
                    width: "350px",
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
              <div>
                <input
                  placeholder="Relationship *"
                  className="text-black personal-info rounded"
                  type="text"
                  name="ecRelation"
                  style={{
                    width: "350px",
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Gardian Contact Number *"
                  className="text-black personal-info rounded"
                  name="ecNumber"
                  style={{
                    width: "350px",
                    height: "45px",
                    padding: "0px 10px",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-black flex justify-left mt-5 font-bold">
              Gardian Verification
            </p>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
            <div>
              <select className="personal-info lg:w-[350px] md:w-[300px] sm:w-full h-[45px] rounded">
                <option>National Id Card</option>
                <option>Passport</option>
                <option>Driving Licence</option>
                <option>Birth Certificate</option>
              </select>
            </div>
            <div>
              <input
                multiple
                onChange={(e) => {
                  setGardianImg(e.target.files);
                }}
                type="file"
                className="mt-2 personal-info rounded "
                required
                name="gardianImg"
                id=""
                style={{
                  width: "350px",
                }}
              />
            </div>
          </div>

          {/* Employment details*/}
          <div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36  mt-5">
              <div>
                <p className="text-black flex justify-left mt-5 font-bold">
                  Employment details
                </p>
                <select
                  name="employeeStatus"
                  className="text-black personal-info rounded"
                  style={{
                    width: "350px",
                    height: "45px",
                    padding: "0px 10px",
                  }}
                >
                  <option>Student</option>
                  <option>Job</option>
                  <option>Business</option>
                  <option>UnEmpolyee</option>
                </select>
              </div>
              <div>
                <p className="text-black flex justify-left mt-5 font-bold">
                  Income Range
                </p>
                <select
                  name="emplyeeIncome"
                  className="text-black personal-info rounded"
                  style={{
                    width: "350px",
                    height: "45px",
                    padding: "0px 10px",
                  }}
                >
                  <option>0-10000</option>
                  <option>10001-20000</option>
                  <option>20001-30000</option>
                  <option>30001-40000</option>
                  <option>Upto 500000+</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p className="text-black flex justify-left mt-5 font-bold">
              Arrival information (Optional)
            </p>

            <div>
              <select
                className="text-black personal-info rounded mt-5"
                style={{
                  width: "350px",
                  height: "45px",
                  padding: "0px 10px",
                }}
                name="arrivalTime"
              >
                <option disabled>Time of Arrival</option>
                <option>11am to 4pm</option>
                <option>5pm to 7pm</option>
                <option>8pm to 10pm</option>
              </select>
            </div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
              <div>
                <textarea
                  placeholder="Special Request Optional"
                  className="personal-info rounded pl-3 lg:w-[718px] md:w-[300px] sm:w-full"
                  name="request"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <p className="flex flex-left text-black mt-2 special-req">
              Special requests cannot be guaranteed but we will do our best to
              meet your needs
            </p>
          </div>
          {/* Payment Option */}
          <h2 className="flex justify-left font-bold mb-5 text-3xl mt-10">
            Payment Options :
          </h2>
          <div className="text-left">
            <button
              className={`summary text-[1rem] font-bold ${toggleClassCheck1} `}
              onClick={() => {
                return (
                  setShowMobile(true),
                  setShowPaymentArrive(false),
                  setShowCreditCard(false),
                  setShowBankTransfer(false),
                  setIsActive1(true),
                  setIsActive2(false),
                  setIsActive3(false),
                  setIsActive4(false)
                );
              }}
              style={{
                border: "none",
              }}
            >
              MOBILE BANKING
            </button>
            <button
              className={`specification text-[1rem] font-bold ${toggleClassCheck2}`}
              onClick={() => {
                return (
                  setShowMobile(false),
                  setShowPaymentArrive(true),
                  setShowCreditCard(false),
                  setShowBankTransfer(false),
                  setIsActive1(false),
                  setIsActive2(true),
                  setIsActive3(false),
                  setIsActive4(false)
                );
              }}
              style={{
                border: "none",
              }}
            >
              PAYMENT ON ARRIVE
            </button>
            <button
              className={`author text-[1rem] font-bold ${toggleClassCheck3}`}
              onClick={() => {
                return (
                  setShowMobile(false),
                  setShowPaymentArrive(false),
                  setShowCreditCard(true),
                  setShowBankTransfer(false),
                  setIsActive1(false),
                  setIsActive2(false),
                  setIsActive3(true),
                  setIsActive4(false)
                );
              }}
              style={{
                border: "none",
              }}
            >
              CREDIT CARD
            </button>
            <button
              className={`customer-review text-[1rem] font-bold ${toggleClassCheck4}`}
              onClick={() => {
                return (
                  setShowMobile(false),
                  setShowPaymentArrive(false),
                  setShowCreditCard(false),
                  setShowBankTransfer(true),
                  setIsActive1(false),
                  setIsActive2(false),
                  setIsActive3(false),
                  setIsActive4(true)
                );
              }}
              style={{
                border: "none",
              }}
            >
              BANK TRANSFER
            </button>

            {showMobile ? <MobileBanking></MobileBanking> : null}
            {showPaymentArrive ? <CashOn></CashOn> : null}
            {showCreditCard ? <CreditCard></CreditCard> : null}
            {showBankTransfer ? <BankTransfer></BankTransfer> : null}
          </div>

          <div className=" mt-20">
            <p className="text-lg text-[#35B0A7]">
              If sending money by Bkash, Nagad or Rocket, then send money with
              Cash-out charge of per thousand
            </p>
          </div>
          <div className="flex items-center mt-20">
            <div>
              <img src={cashImg} alt="" />
            </div>
            <p className="text-lg text-[]">
              NOTE : You could pay directly in our structure with any kind of
              credit card or cash.
            </p>
          </div>
        </div>

        {/* Cart for Lg */}
        <div id="keyDetails">
          <div className="mt-5 lg:ml-44 md:ml-0 sticky md:top-24">
            <div
              style={{
                // width: "430px",

                boxShadow:
                  "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#35B0A7",
                  // width: "430px",
                  height: "55px",
                  borderRadius: "3px 3px 0px 0px",
                }}
              ></div>
              <div
                className="px-3 py-2 m-3"
                style={{
                  boxShadow: "0px 0px 5px 3px #CCC",
                  borderRadius: "5px",
                }}
              >
                <h2
                  className="text-left font-bold"
                  style={{ color: "#212A42" }}
                >
                  {bookingItem?.data?.name}
                </h2>
                <div className="flex ">
                  <div>
                    <img src={brachLocationIcon} alt="" />
                  </div>
                  <p className="text-black">{branch?.name}</p>
                </div>
                <p
                  className=" flex justify-start w-[60%]"
                  style={{
                    backgroundColor: "#FCA22A",
                    color: "white",
                    padding: "3px 5px ",
                    borderRadius: "5px",
                  }}
                >
                  {bookingItem?.roomType}
                </p>
              </div>

              <div className="mx-5">
                <div className="flex justify-evenly ">
                  <ul className="flex justify-evenly ">
                    <li className="list-none border py-1">
                      <span
                        className={` px-11 py-2 ${
                          bookingItem?.customerRent?.remainingDays <
                            getLastDayOfMonth() &&
                          bookingItem?.customerRent?.years === undefined
                            ? "dmyActive "
                            : "text-black"
                        }`}
                      >
                        Day
                      </span>
                    </li>
                    <li className="list-none border py-1">
                      <span
                        className={` px-11 py-2 ${
                          bookingItem?.customerRent?.remainingDays >=
                            getLastDayOfMonth() &&
                          bookingItem?.customerRent?.years === undefined
                            ? "dmyActive "
                            : "text-black"
                        }`}
                      >
                        Month
                      </span>
                    </li>
                    <li className="list-none border py-1">
                      <span
                        className={` px-11 py-2 ${
                          bookingItem?.customerRent?.years >= 1
                            ? "dmyActive "
                            : "text-black"
                        }`}
                      >
                        Year
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-evenly mt-3 total-area text-black">
                <div>
                  <p className="text-center font-bold">Check-In</p>
                  <div
                    className="input-filed-area w-full"
                    style={{ marginTop: 10 }}
                  >
                    <i
                      className="fa-solid fa-calendar-days location-icon"
                      style={{ color: "#00bbb4", marginTop: -3 }}
                    ></i>
                    <input
                      className="ps-7 input_main"
                      type="date"
                      defaultValue={bookingItem?.rentDate?.bookStartDate}
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <p className="text-center font-bold mb-1">Check-Out</p>
                  <div
                    className="input-filed-area w-full"
                    style={{ marginTop: 10 }}
                  >
                    <i
                      className="fa-solid fa-calendar-days location-icon"
                      style={{ color: "#00bbb4", marginTop: -3 }}
                    ></i>
                    <input
                      className="ps-7"
                      type="date"
                      defaultValue={bookingItem?.rentDate?.bookEndDate}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5 items-center">
                <p className="font-bold mb-1 ms-20">Duration = </p>
                <div>
                  <input
                    className="px-2 "
                    type="text"
                    value={`${
                      bookingItem?.customerRent?.daysDifference >= 0
                        ? `${bookingItem?.customerRent?.daysDifference} Days`
                        : "" ||
                          (bookingItem?.customerRent?.months &&
                            bookingItem?.customerRent?.days >= 0 &&
                            !bookingItem?.customerRent?.years)
                        ? `${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                        : "" ||
                          (bookingItem?.customerRent?.years &&
                            bookingItem?.customerRent?.months >= 0 &&
                            bookingItem?.customerRent?.days >= 0)
                        ? `${bookingItem?.customerRent?.years} years, ${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                        : ""
                    }`}
                    disabled
                  />
                </div>
              </div>

              <div className="md:flex m-5 total-area relative ms-12">
                <div>
                  <input
                    className="sm:px-10 md:px-12"
                    type="text"
                    style={{ height: "30px" }}
                    placeholder="Pormo Code"
                    disabled
                  />
                  <div className="absolute top-2 left-3">
                    <img src={promoIcon} alt="" />
                  </div>
                </div>
                <div className="sm:flex sm:justify-center md:mt-0 sm:mt-3">
                  <button
                    style={{
                      border: "1px solid #399",
                      backgroundColor: "#35B0A7 ",
                      color: "white",
                      borderRadius: "0px 2px 2px 0px",
                      padding: "2px 10px",
                    }}
                    disabled
                  >
                    Confirm
                  </button>
                </div>
              </div>

              {/* <div className="text-black font-bold text-lg pr-5">
              <div className="flex justify-between ">
                <p className="ml-16">Sub-Total</p>
                <p>BDT {bookingItem?.subTotal}</p>
              </div>
              <div className="flex justify-between">
                <p className="ml-16">Promo Code</p>
                <p> - BDT {bookingItem?.promoCodeDiscount}</p>
              </div>
              <div className="flex justify-between">
                <p className="ml-16">VAT & TAX</p>
                <p> + BDT {bookingItem?.vatTax}</p>
              </div>
              <hr className="mt-3 ml-5 text-black" />
              <div className="flex justify-between mt-2">
                <p className="ml-16">Total Amount</p>
                <p>BDT {bookingItem?.totalAmount}</p>
              </div>
            </div> */}
              <div className="text-black font-bold text-lg pr-5">
                <div className="flex justify-between ">
                  <div className="ml-16 flex items-center">
                    <p>Rent</p>
                    {/* <div className="ml-2">
                      <Tooltip
                        content={
                          <div>
                            <Typography
                              variant="small"
                              style={{
                                color: "white",
                                backgroundColor: "black",
                                width: "200px",
                              }}
                              className="font-normal opacity-75 px-5 py-2 rounded"
                            >
                   
                            </Typography>
                          </div>
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-5 w-5 cursor-pointer text-blue-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      </Tooltip>
                    </div> */}
                  </div>
                  <p>BDT {bookingItem?.subTotal}</p>
                </div>

                <div className="flex justify-between">
                  <div className="ml-16 flex items-center">
                    <p>VAT</p>
                  </div>

                  <p> + BDT {bookingItem?.vatTax}</p>
                </div>
                {bookingItem?.customerRent?.months >= 1 ||
                bookingItem?.customerRent?.years ? (
                  <div className="flex justify-between ">
                    <div className="ml-16 flex items-center">
                      <p>Admission Fee</p>
                    </div>
                    <p>
                      BDT{" "}
                      {bookingItem?.customerRent?.months >= 2 ||
                      bookingItem?.customerRent?.years
                        ? bookingItem?.addMissionFee
                        : 0}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {bookingItem?.customerRent?.months >= 1 ||
                bookingItem?.customerRent?.years ? (
                  <div className="flex justify-between ">
                    <div className="ml-16 flex items-center">
                      <p>Security Fee</p>
                    </div>
                    <p>
                      BDT{" "}
                      {bookingItem?.customerRent?.months >= 2 ||
                      bookingItem?.customerRent?.years
                        ? bookingItem?.securityFee
                        : 0}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {/* {promoCodeCheck ? (
                <div className="flex justify-between">
                  <div className="ml-16 flex items-center">
                    <p>Promo Code</p>
               
                  </div>
                  <p> - BDT {promoCodeDiscount}</p>
                </div>
              ) : (
                ""
              )} */}

                <hr className="mt-3 ml-5 text-black" />
                <div className="flex justify-between mt-2">
                  <p className="ml-16">Total Amount</p>
                  <p>BDT {bookingItem?.totalAmount}</p>
                </div>

                {(bookingItem?.customerRent?.months >= 1 &&
                  bookingItem?.customerRent?.years === undefined) ||
                (bookingItem?.customerRent?.months === 0 &&
                  bookingItem?.customerRent?.years !== undefined) ? (
                  <div className="flex justify-between">
                    <div className="ml-16 flex items-center payment-check">
                      <p className="text-red-500">Advance Payment</p>
                    </div>
                    <p>
                      {" "}
                      BDT{" "}
                      {bookingItem?.minimumPayment
                        ? bookingItem?.minimumPayment
                        : 0}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={`flex justify-between ${
                    (bookingItem?.customerRent?.months >= 1 &&
                      bookingItem?.customerRent?.years === undefined) ||
                    (bookingItem?.customerRent?.months === 0 &&
                      bookingItem?.customerRent?.years >= 1)
                      ? "hidden"
                      : "block"
                  }`}
                >
                  <div className="ml-16 flex items-center payment-check">
                    <p className="text-red-500">Minimum Payment</p>
                  </div>
                  <p>
                    {" "}
                    BDT{" "}
                    {bookingItem?.minimumPayment
                      ? bookingItem?.minimumPayment
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 mt-12 text-black terms">
                <div>
                  <input
                    type="checkbox"
                    name="terms"
                    id=""
                    onClick={() => setBookingExtend(!bookingExtend)}
                  />
                </div>
                <p className="text-left pl-3 text-[#35B0A7] font-bold">
                  I Would Like to Extend in Future
                </p>
              </div>
              <div className="flex px-4 mt-10 text-black terms">
                <div>
                  <input type="checkbox" name="terms" required id="" />
                </div>
                <p className="text-left pl-3 mt-[-15px]">
                  I agree with Project Second Home’s Terms of Service and
                  Privacy Policy
                </p>
              </div>
              <div className="bg-[#35B0A7] h-[55px] flex justify-center items-center mt-3">
                <div>
                  <input
                    type="submit"
                    className="text-xl p-2 cursor-pointer text-white bg-transparent"
                    style={{ borderRadius: 8 }}
                    value="Confirm Booking"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex justify-center mb-4 fixed bottom-0"
          style={{ zIndex: 9999, width: "97%" }}
        >
          <div className="filter md:invisible">
            <i className="fas fa-shopping-cart mt-2"></i>
            <a
              href="#keyDetails"
              onClick={anchorClickHandler}
              className=" ms-3 text-white hover:text-white"
            >
              Booking Cart
            </a>
          </div>
        </div>
      </div>
      <Toaster
        containerStyle={{ top: 300 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </form>
  );
};

export default PersonalInfo;
