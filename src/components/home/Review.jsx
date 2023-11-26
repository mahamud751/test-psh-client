import { Avatar } from "@material-tailwind/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import commaIcon from "../../assets/img/comaIcon.png";
import Slider from "react-slick";
const Review = () => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
    ],
  };

  return (
    <div>
      <div className=" my-20">
        <Slider {...settings}>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="avatar"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mrs. Fatema</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="avatar"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mrs. Fatema</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="avatar"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mrs. Fatema</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="avatar"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mrs. Fatema</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="avatar"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mrs. Fatema</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Review;
