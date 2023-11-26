import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";

import UseFetch from "../../hooks/useFetch";
import SingleCard from "./SingleCard";
import { settings } from "../../slider/Slider";
import "./Recommended.css";
const Recommended = () => {
  const { data, loading, error, reFetch } = UseFetch(
    `property/properties/recommended`
  );

  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Our Best Recommend
      </h2>
      <span className="text-[1rem]">Our best rooms available for you</span>
      <div className="all_recommended mt-4">
        <Splide
          options={{
            // type: "loop",
            arrows: true,
            rewind: true,
            drag: "free",
            autoplay: true,
            gap: "1rem",
            perPage: 5,
            height: "26rem",
            pagination: false,
            breakpoints: {
              1200: { arrows: true, perPage: 4 },
              800: { arrows: true, perPage: 2 },
              640: { arrows: true, perPage: 1 },
            },
          }}
        >
          {data.map((item, i) => (
            <SplideSlide>
              <SingleCard item={item} />
            </SplideSlide>
          ))}
        </Splide>
        {/* <Slider {...settings}>
                  {data?.map((item) => (
                    <SingleCard item={item} />
                  ))}
                </Slider> */}
      </div>
    </div>
  );
};

export default Recommended;
