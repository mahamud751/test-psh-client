import React from "react";
import UseFetch from "../../hooks/useFetch";
import Slider from "react-slick";

const Banner = () => {
  const { data } = UseFetch(`banner`);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          padding: 20,
        },
      },
    ],
  };

  return (
    <>
      <div style={{ zIndex: "000" }}>
        <div className="md:p-10 lg:p-0">
          <Slider {...settings}>
            {data?.map((pd, i) => (
              <div>
                <img
                  key={i}
                  src={pd.photos[0]}
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <PopUp /> */}
    </>
  );
};

export default Banner;
