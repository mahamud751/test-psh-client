import React, { useEffect, useState } from "react";

const Map = ({ branch }) => {
  const [mapLink, setMapLink] = useState([]);

  useEffect(() => {
    fetch("../../../public/map.json")
      .then((res) => res.json())
      .then((data) => {
        setMapLink(data);
      });
  }, []);
  return (
    <div>
      <div>
        <iframe
          src={branch?.locationLink}
          width="810"
          height="400"
          style={{ border: 0 }}
          // allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="map-link"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
