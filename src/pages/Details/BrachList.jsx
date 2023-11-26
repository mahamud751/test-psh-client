import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import whislistIcon from "../../assets/img/Wishlist.png";
import locationIcon from "../../assets/img/branchLocationIcon.png";
import { Link } from "react-router-dom";
const BranchList = ({ item }) => {
  // Checking Booking Dates for privet room and apartment
  const currentDate = new Date().toISOString().split("T")[0];
  // Check if the target date falls within any of the date ranges
  let isIntoDate = false;

  for (const range of item?.rentDate) {
    if (currentDate <= range.bookEndDate) {
      isIntoDate = true;
      break; // No need to continue checking once a match is found
    }
  }

  const isAlreadySeatBook = [];

  let isSeatIntoDate = false;
  for (const range of item?.seats) {
    for (const rentDate of range?.rentDate) {
      isAlreadySeatBook.push(rentDate);
      if (currentDate <= rentDate.bookEndDate) {
        isSeatIntoDate = true;
        break; // No need to continue checking once a match is found
      }
    }
  }

  return (
    <>
      <Link to={`/room/${item._id}`} className="single-card w-full">
        <Card className="mb-5">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              className="img_size"
              style={{ borderRadius: "10px 10px 0px 0px" }}
              src={item.photos[0]}
              alt="No Found Image"
            />
            <div className="absolute top-2 right-2">
              <img src={whislistIcon} alt="" />
            </div>
            {isIntoDate ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>Already Booked</span>
              </div>
            ) : (
              ""
            )}
            {isSeatIntoDate &&
            item?.category?.name === "Shared Room" &&
            isAlreadySeatBook?.length > 0 ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>
                  {item?.seats?.length === isAlreadySeatBook?.length
                    ? "No Seat Availbale"
                    : `Only ${
                        item?.seats?.length - isAlreadySeatBook?.length
                      } Seat Left`}
                </span>
              </div>
            ) : (
              ""
            )}
            {!isSeatIntoDate && item?.category?.name === "Shared Room" ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>{item?.seats?.length} Seat Available</span>
              </div>
            ) : (
              ""
            )}
          </CardHeader>
          <CardBody className="p-2">
            <div className="flex items-center justify-between">
              <Typography variant="div">
                <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                  {item?.category?.name}({item.type.toUpperCase()})
                </span>
              </Typography>
              <Typography variant="div" className="flex ">
                {/* <span className="text-sm">4.8</span>
                <img
                  className="ml-1 "
                  style={{ width: "18px", height: "18px" }}
                  src={startIcon}
                  alt=""
                /> */}
              </Typography>
            </div>
            <div className="flex itmes-center">
              <img
                className="mt-1"
                src={locationIcon}
                style={{ height: "15px", width: "15px" }}
                alt=""
              />
              <p className="branch-location">
                <span className="text-[10px]">{item.branch?.name}</span>
              </p>
            </div>

            <div className="">
              <Typography>
                <h2 className=" text-[14px] card-title ">
                  {item.name.slice(0, 29)} {item.name?.length > 29 ? "..." : ""}
                </h2>
              </Typography>
            </div>
          </CardBody>

          <CardFooter className="p-0">
            {/* <div className="flex items-center">
              <div className="flex"></div>
              <div className="flex ml-1 ">
                <div>
                  <img src={doubleBedIcon} alt="" />
                </div>
                <div className=" text-[12px]">
                  <span>{item.bedroom} Beds </span>
                </div>
              </div>
              <div className="flex ml-1">
                <div>
                  <img src={bathroomIcon} alt="" />
                </div>
                <div className=" text-[12px]">
                  <span>{item.bathroom} Bathrooms </span>
                </div>
              </div>
            </div> */}
            <div className="card-price flex gap-x-3 px-2 mb-2">
              {item?.category?.name === "Shared Room" ? (
                <>
                  <p>
                    <span className="card-price-sub">
                      BDT {item?.seats[0]?.perDay}
                    </span>
                    <span className="day">/day</span>
                  </p>
                  <p className="">
                    <span className=" card-price-sub">
                      {" "}
                      BDT {item?.seats[0]?.perMonth}{" "}
                    </span>
                    <span className="day">/month</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className=" card-price-sub">BDT {item.perDay}</span>
                    <span className="day">/day</span>
                  </p>
                  <p>
                    <span className="card-price-sub">
                      {" "}
                      BDT {item.perMonth}{" "}
                    </span>
                    <span className="day">/month</span>
                  </p>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default BranchList;
