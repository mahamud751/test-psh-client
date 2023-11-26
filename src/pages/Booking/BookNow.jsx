import React from "react";
import PaymentToggle from "../Payment/PaymentToggle";
import cashImg from "../../assets/img/Cash-1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import { useState } from "react";
import { useEffect } from "react";
import userEndOrder from "../../hooks/userEndOrder";
const BookNow = () => {
  const { user } = useContext(AuthContext);
  const [endOrder, setEndOrder] = useState("");
  const [userOrder] = userEndOrder();

  const navigate = useNavigate();
  // console.log(endOrder);

  useEffect(() => {
    if (userOrder) {
      const lastOrder = userOrder[userOrder?.length - 1];

      setEndOrder(lastOrder);
    }
  }, [userOrder, user]);

  const getInvoice = () => {
    navigate("/invoice", { state: endOrder });
  };
  return (
    <div className=" xl:mx-96 lg:mx-96 py-20 text-black sm:p-10">
      {/* Personal Info */}
      <h2 className="flex justify-left font-bold mb-5 text-3xl">
        Your Information :
      </h2>
      <div className="text-xl">
        <div className="flex justify-between">
          <p className="flex">
            <p>Name</p> <p className="ml-32">:</p>
          </p>
          <p>{endOrder?.fullName}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Email</p> <p className="ml-[130px]">:</p>
          </p>
          <p>{endOrder?.email}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Phone Number</p> <p className="ml-[45px]">:</p>
          </p>
          <p>{endOrder?.phone}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Present Address</p> <p className="ml-[32px]">:</p>
          </p>
          <p>{endOrder?.address}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Cuopon</p> <p className="ml-[110px]">:</p>
          </p>
          <p>None</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Arrival Time</p> <p className="ml-[75px]">:</p>
          </p>
          <p>{endOrder?.arrivalTime}</p>
        </div>
      </div>
      {/* Booking Information */}

      <h2 className="flex justify-left font-bold mb-5 text-3xl mt-10">
        Booking Information :
      </h2>
      <div className="text-xl">
        <div className="flex justify-between">
          <p className="flex">
            <p>Room Type</p> <p className="ml-20">:</p>
          </p>
          <p>{endOrder?.bookingInfo?.roomType}</p>
        </div>
        <hr className="mt-2" />
        {endOrder?.bookingInfo?.roomType === "Shared Room" ? (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <p>Seat Number</p> <p className="ml-[64px]">:</p>
            </p>
            <p>{endOrder?.bookingInfo?.seatBooking?.seatNumber}</p>
          </div>
        ) : (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <p>Room Number</p> <p className="ml-[64px]">:</p>
            </p>
            <p>{endOrder?.bookingInfo?.data?.roomNumber}</p>
          </div>
        )}

        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Check-In</p> <p className="ml-[102px]">:</p>
          </p>
          <p>{endOrder?.bookingInfo?.rentDate?.bookStartDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Check-Out</p> <p className="ml-[85px]">:</p>
          </p>
          <p>{endOrder?.bookingInfo?.rentDate?.bookEndDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Total Duration</p> <p className="ml-[58px]">:</p>
          </p>
          <p>
            {endOrder?.bookingInfo?.customerRent?.daysDifference >= 0
              ? `${endOrder?.bookingInfo?.customerRent?.daysDifference} days`
              : "" ||
                (endOrder?.bookingInfo?.customerRent?.months &&
                  endOrder?.bookingInfo?.customerRent?.days >= 0 &&
                  !endOrder?.bookingInfo?.customerRent?.years)
              ? `${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} days`
              : "" ||
                (endOrder?.bookingInfo?.customerRent?.years &&
                  endOrder?.bookingInfo?.customerRent?.months >= 0 &&
                  endOrder?.bookingInfo?.customerRent?.days >= 0)
              ? `${endOrder?.bookingInfo?.customerRent?.years} year`
              : ""}
          </p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <p>Total Amount</p> <p className="ml-[64px]">:</p>
          </p>
          <p>Tk {endOrder?.bookingInfo?.totalAmount}</p>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <div
          onClick={getInvoice}
          className="bg-[#35B0A7] px-[120px] py-[8px] rounded"
        >
          <button className="text-xl text-white">Get Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
