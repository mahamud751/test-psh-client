import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";
import Slider from "react-slick";
// import { Card, CardHeader, CardBody } from "@material-tailwind/react";

import UseFetch from "../../hooks/useFetch";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Header from "./Header";
import axios from "axios";
import SingleCard from "./SingleCard";
import { settings } from "../../slider/Slider";
import SearchBoxSm from "./SearchBoxSm";

export default function Categories() {
  const { data, loading, error, reFetch } = UseFetch(`property`);

  const [categories, setCategories] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false); // Track the loading status
  const [randomIndex, setRandomIndex] = useState([]);

  // show Random index
  const getRandomData = () => {
    const shuffledData = [...data];

    for (let i = shuffledData.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[random]] = [
        shuffledData[random],
        shuffledData[i],
      ];
    }

    setRandomIndex([...shuffledData]);
  };

  useEffect(() => {
    localStorage.removeItem("seatItem");
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://api.psh.com.bd/api/category",
          {
            mode: "cors",
          }
        );

        const categoryMap = {};

        data.forEach((category) => {
          categoryMap[category?._id] = category?.name;
        });
        setCategories(categoryMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const uniqueValues = Array.from(
        new Set(data.map((item) => item?.category?._id))
      );
      // setActiveTab(uniqueValues[0]);
      getRandomData();
      setIsLoaded(true); // Mark data as loaded
    }
  }, [data]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center mt-5">
        <div>
          <Spinner color="green" className="h-10 w-10" />
        </div>
      </div>
    ); // Placeholder for initial loading state
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>; // Placeholder for error state
  }

  const uniqueValues = Array.from(
    new Set(data.map((item) => item?.category?._id))
  );

  const filteredData = data.filter((item) => item.category?._id === activeTab);
  // console.log(filteredData);

  return (
    <div className="category-item">
      <Header />

      <div className=" text-left mt-14">
        <Tabs value="All" className=" ">
          <TabsHeader
            className="rounded-none border-b bg-transparent p-0 gap-x-14 sm:gap-x-4"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-[#00BBB4] shadow-none rounded-none ",
            }}
          >
            <Tab
              value="All"
              onClick={() => {
                getRandomData();
                setActiveTab("All");
              }}
              className="w-fit  md:text-[20px] sm:text-[14px]"
            >
              All
            </Tab>
            {uniqueValues.map((type, index) => {
              const item = data.find((item) => item?.category?._id === type);
              if (!item) return null;

              const categoryName = categories[item?.category?._id]; // Get the category name using the ID

              return (
                <Tab
                  key={index}
                  value={type}
                  onClick={() => setActiveTab(type)}
                  style={{ display: "unset" }}
                  className="w-fit md:text-[20px] sm:text-[13px] "
                >
                  {categoryName}
                </Tab>
              );
            })}
          </TabsHeader>
        </Tabs>
        {/* card start */}
      </div>

      <div className="mt-3 all_recommended">
        <Splide
          options={{
            // type: "loop",
            arrows: true,
            rewind: true,
            drag: "free",
            autoplay: true,
            gap: "1rem",
            perPage: 5,
            height: "32rem",
            pagination: false,
            breakpoints: {
              1200: { arrows: true, perPage: 4 },
              800: { arrows: true, perPage: 2 },
              640: { arrows: true, perPage: 1, height: "30rem" },
            },
          }}
        >
          {activeTab === "All"
            ? randomIndex?.map((item) => (
                <SplideSlide>
                  <SingleCard item={item} />{" "}
                </SplideSlide>
              ))
            : filteredData.map((item) => (
                <SplideSlide>
                  <SingleCard item={item} />{" "}
                </SplideSlide>
              ))}
        </Splide>
        {/* <Slider {...settings}>
          {activeTab === "All"
            ? randomIndex?.map((item) => <SingleCard item={item} />)
            : filteredData.map((item) => <SingleCard item={item} />)}
        </Slider> */}
      </div>

      {/* <div className=" xl:mx-[244px] lg:mx-32 md:mx-26 mt-3 room-slide">
        <Splide
          options={{
            // type: "loop",
            arrows: true,
            rewind: true,
            drag: "free",

            gap: "1rem",
            perPage: 4,

            pagination: false,
            breakpoints: breakpoints,
          }}
        >
          {activeTab === "All"
            ? randomIndex?.map((item) => (
                <SplideSlide>
                  <SingleCard item={item} />
                </SplideSlide>
              ))
            : filteredData.map((item) => (
                <SplideSlide>
                  <SingleCard item={item} />{" "}
                </SplideSlide>
              ))}
        </Splide>
      </div> */}
    </div>
  );
}
