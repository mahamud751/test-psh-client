import React from "react";
import "./Facility.css";
import healthyMealIcon from "../../assets/img/healthy-meal.png";
import security24 from "../../assets/img/security-24.svg";
const Facility = () => {
  return (
    <div>
      <div style={{ background: "rgba(245, 245, 245, 1)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
          <div className="mx-auto max-w-2xl py-4 lg:max-w-none lg:py-2">
            <div className="mt-6 md:space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src="/images/Icon.png" className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">Enjoy free Wi-Fi</h2>
                    <p>
                      Enjoy complimentary high-speed internet access throughout
                      the premises
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src={healthyMealIcon} className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">Healthy Meal</h2>
                    <p>
                      Provide nutritious and well-balanced meal choices prepared
                      with fresh ingredients.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-24">
                <div className="flex">
                  <div>
                    <img src={security24} className="facility_img" />
                  </div>
                  <div className="facility">
                    <h2 className="facility_h2">24/7 Security</h2>
                    <p>
                      Rest assured with round-the-clock security mea sures to
                      ensure a safe and secure environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
