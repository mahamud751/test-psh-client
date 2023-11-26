import React from "react";

import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const Offices = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl   text-gray-900">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
          <h2 className="text-2xl font-bold text-gray-900 p-5">Our Offices</h2>
          <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6 ">
              <Card className=" overflow-hidden">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src="https://i.ibb.co/TMwfcmf/Login-1.png
                    "
                    alt="ui/ux review check"
                  />
                </CardHeader>
                <CardBody className="p-4 h-25">
                  <h6 className="text-black font-bold">Head Office </h6>

                  <p className="mt-3">
                    Dhanmondi 03, Road 03, Dhaka -1234, Bangladesh.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6 ">
              <Card className="overflow-hidden">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src="https://i.ibb.co/j6gPbRM/Login.png"
                    alt="ui/ux review check"
                  />
                </CardHeader>
                <CardBody className="p-4 h-25">
                  <h6 className="text-black font-bold">Branch Office </h6>

                  <p className="mt-3">
                    Dhanmondi 03, Road 03, Dhaka -1234, Bangladesh.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <div className="my-24">
          <div className="grid grid-cols-12 sm:px-5  gap-y-16">
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-12">
              <div className="xl:px-64">
                <p className="project">
                  “ Project Second Home is for Everyone Safety and Friendly ”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offices;
