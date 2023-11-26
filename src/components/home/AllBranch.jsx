import React from "react";
import "./AllBranch.css";
import UseFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
const AllBranch = () => {
  const { data } = UseFetch(`branch`);
  return (
    <div>
      <div>
        <div className=" ">
          <div className="py-12">
            <h2 className="text-2xl font-bold ">
              Looking For Best Place To Stay{" "}
            </h2>
            <h6 className="mb-10 mt-2">Our available Branches for your stay</h6>
            <div className="all_branch ">
              <Splide
                options={{
                  // type: "loop",
                  arrows: true,
                  rewind: true,
                  drag: "free",

                  gap: "1rem",
                  perPage: 4,
                  height: "14rem",
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
                    <div className="items-start ">
                      <Link to={`/branch/${item._id}`}>
                        <Card
                          shadow={false}
                          className="relative grid h-[14rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                            style={{
                              backgroundImage: `url('${item.photos[0]}')`,
                            }}
                          >
                            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 " />
                          </CardHeader>
                          <CardBody className="relative  px-6 md:px-12">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                              }}
                            >
                              <i className="fa-solid fa-location-dot text-white me-3 mt-1"></i>
                              <Typography
                                variant="h5"
                                className="mb-4 text-white "
                              >
                                {item.name}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                        {/* <div
                          className="module"
                          // style={{
                          //   backgroundImage: `url('${item.photos[0]}')`,
                          // }}
                        >
                          <header className="flex">
                            <i class="fa-solid fa-location-dot"></i>
                            <p>{item.name}</p>
                          </header>
                        </div> */}
                      </Link>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBranch;
