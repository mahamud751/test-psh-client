import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import UseFetch from "../../hooks/useFetch";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";

export default function Categories() {
  const [activeTab, setActiveTab] = React.useState("html");

  const { data, loading, error, reFetch } = UseFetch(`hotels`);
  const uniqueValues = Array.from(new Set(data.map((item) => item.type)));
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
        }}
      >
        {uniqueValues.map((type) => {
          const item = data.find((item) => item.type === type);
          if (!item) return null;

          return (
            <Tab
              key={_id}
              value={type}
              onClick={() => setActiveTab(type)}
              className={activeTab === type ? "text-blue-500" : ""}
            >
              {type}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody>
        {data.map(
          ({
            type,
            desc,
            _id,
            availble,
            photos,
            rating,
            address,
            perDay,
            perMonth,
            perYear,
          }) => (
            <TabPanel key={_id} value={type}>
              <Splide
                options={{
                  // type: "loop",
                  arrows: false,
                  drag: "free",
                  focus: "center",
                  gap: "1rem",
                  perPage: 4,
                  height: "25rem",
                  breakpoints: {
                    1200: { arrows: true, perPage: 4 },
                    800: { perPage: 2 },
                    640: { perPage: 1 },
                  },

                  // autoScroll: {
                  //   speed: 2,
                  // },
                }}
                // extensions={{ AutoScroll }}
              >
                <SplideSlide>
                  <div className="text-start">
                    <Card className="overflow-hidden">
                      <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 rounded-none"
                      >
                        {availble === 0 ? (
                          <span className="note2">Join Waiting List</span>
                        ) : (
                          <span className="note">
                            Only {availble} Seat Left
                          </span>
                        )}

                        <img src={photos[0]} alt="ui/ux review check" />
                      </CardHeader>
                      <CardBody className="p-2">
                        <div className="flex justify-between w-full px-3">
                          <p>{address}</p>

                          <div className="flex">
                            <p>5.0</p>
                            <div>
                              <i className="fas fa-star ms-2" />
                            </div>
                          </div>
                        </div>
                        <a className="px-3 font-bold text-black">{type}</a>
                        <p className="px-3 font-thin w-full text-xs">{desc}</p>
                        <div className="flex justify-between w-full px-3 mt-3">
                          <div>
                            <p className="text-sm text-black font-bold">
                              Per Day :{" "}
                              <span className="font-normal"> BDT {perDay}</span>
                            </p>
                            <p className="text-sm text-black font-bold">
                              Per Month :{" "}
                              <span className="font-normal">
                                {" "}
                                BDT {perMonth}
                              </span>
                            </p>
                            <p className="text-sm text-black font-bold">
                              Per Year :{" "}
                              <span className="font-normal">
                                {" "}
                                BDT {perYear}
                              </span>
                            </p>
                          </div>
                          <div>
                            <i className="fa-regular fa-heart mt-7 text-2xl"></i>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </SplideSlide>
              </Splide>
            </TabPanel>
          )
        )}
      </TabsBody>
    </Tabs>
  );
}
