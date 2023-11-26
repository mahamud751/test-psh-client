import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const Promo = () => {
  const { id } = useParams();
  const { data } = UseFetch(`promo/${id}`);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Exclusive Voucher Offers{" "}
            </h2>
            <div className="flex justify-between">
              <Card className="mt-6 w-full">
                <CardBody className="md:flex justify-between">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Available Vouchers:
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {data.promoName}
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Voucher Code: {data.promoCode}
                    </Typography>
                    <li>Discount: {data.promoDiscount} %off</li>
                    <li> Minimum Booking: {data.minimumDays} Days</li>
                    <li> Expiration Date: {data.promoEnd}</li>
                  </div>
                  <Button
                    style={{ background: "#00bbb4", width: 220, height: 60 }}
                  >
                    Reddem Now
                  </Button>
                </CardBody>
                <div className="mt-6">
                  <div
                    className="flex items-center cursor-pointer justify-center"
                    onClick={handleToggleExpand}
                    style={{
                      background: "#00bbb4",
                      height: 40,
                      color: "white",
                    }}
                  >
                    <span className="me-2 ">
                      {isExpanded ? "Hide Details" : "Show Details"}
                    </span>
                    <Icon id={data.id} open={isExpanded} />
                  </div>
                  {isExpanded && (
                    <div className="mt-4 text-blue-gray p-5">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        How to Use Vouchers:
                      </Typography>
                      <p>1. Select a voucher from the list above.</p>
                      <p>
                        2. During the booking process, enter the voucher code.
                      </p>
                      <p>3.The discount will be applied to your total. </p>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2 mt-5"
                      >
                        Terms and Conditions:
                      </Typography>
                      <li>
                        {" "}
                        Vouchers are valid until the expiration date mentioned.
                      </li>
                      <li>
                        {" "}
                        Minimum booking requirements must be met for each
                      </li>
                      <li> Voucher. Each voucher can be used only once.</li>
                    </div>
                  )}
                </div>
                {/* ... (your existing JSX) */}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo;
