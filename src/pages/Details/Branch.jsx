import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import React from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";

import BranchList from "./BrachList";
const Branch = () => {
  const { id } = useParams();
  const { data } = UseFetch(`branch/${id}`);

  return (
    <div>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <h1 className="my-5 text-center">
            Welcome to <span style={{ color: "#00bbb4" }}>{data.name}</span>
          </h1>
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
              {data.property ? (
                data.property.map((item, i) => (
                  <div className="flex flex-col items-start col-span-12  sm:col-span-12 xl:col-span-3">
                    <BranchList item={item} />
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center text-bg-danger not_found">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/Jr6dcW7/Figma.png"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;
