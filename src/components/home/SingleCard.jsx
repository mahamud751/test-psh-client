import React from "react";
import "./SingleCard.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";

import whislistIcon from "../../assets/img/Wishlist.png";
import whislistIcon2 from "../../assets/img/heart.png";
import locationIcon from "../../assets/img/branchLocationIcon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import { useState } from "react";
import { useEffect } from "react";
import UseFetch from "../../hooks/useFetch";
const SingleCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  console.log("item", item);
  const userName = user?.firstName;
  const email = user?.email;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/property/${item._id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [item?._id]);
  console.log(data);
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
  const propertyId = data?._id;
  const MySwal = withReactContent(Swal);
  const { data: wishlist, reFetch: wishlistRefetch } = UseFetch(`wishlist`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const product = {
        userName,
        propertyId,
        email,
      };
      await axios.post("https://api.psh.com.bd/api/wishlist", product);
      MySwal.fire("Thanks ! wishlisted");
      wishlistRefetch();
    } catch (err) {
      MySwal.fire("Already Added!");
    }
  };

  const exactWishList = wishlist?.filter(
    (wishList) => wishList?.property?._id == data?._id
  );
  const userWishList = exactWishList?.find(
    (wishList) => wishList?.email === email
  );
  const checkWishLists = wishlist?.filter((pd) => pd?.email === email);
  const checkWishListIds = checkWishLists?.map((item) => item?.property?._id);
  const handleRemoveSubmit = async (event) => {
    event.preventDefault();
    try {
      const product = {
        userName,
        propertyId,
        email,
      };
      await axios.delete(
        `https://api.psh.com.bd/api/wishlist/${userWishList._id}`,
        product
      );
      MySwal.fire("Successfullt Remove ! wishlisted");
      wishlistRefetch();
    } catch (err) {
      MySwal.fire("Wrong!");
    }
  };
  return (
    <>
      <Link to={`/room/${item._id}`} className="single-card ">
        <Card
          className="mb-5"
          style={{
            width: "100%",
            // height: "22rem",
          }}
        >
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
              {checkWishListIds?.some((item) => item === data?._id) ? (
                <img
                  src={whislistIcon2}
                  alt="wishlist"
                  onClick={handleRemoveSubmit}
                />
              ) : (
                <img src={whislistIcon} alt="wishlist" onClick={handleSubmit} />
              )}
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
              <Typography variant="div" className="flex "></Typography>
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

export default SingleCard;
