import React, { useState, useRef, useContext } from "react";

import UseFetch from "../../hooks/useFetch";
const Privacy = () => {
  const { data } = UseFetch(`privacy`);

  return (
    <div className=" mt-5 px-24">
      <h3 className="text-[32px] font-bold whitespace-normal text-center">
        Privacy Policy
      </h3>
      <div className="my-10">
        {data.map((item, i) => (
          <div dangerouslySetInnerHTML={{ __html: item.desc }} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Privacy;
