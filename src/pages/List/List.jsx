import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import UseFetch from "../../hooks/useFetch";
import Header from "../../components/home/Header";
import HotelsList from "../../components/Hotels/HotelsList";
import "./List.css";
import ListFilter from "./ListFilter";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";

function List({ type }) {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [furnitured, setRecommended] = useState(
    location.state?.furnitured || ""
  );
  const [gender, setGender] = useState(location.state?.gender || "");
  const [category, setCategory] = useState(location.state?.category || "");

  const inputDate = useSelector((state) => state.inputDate);

  const [bedrooms, setBedrooms] = useState(
    Array.isArray(location.state.bedrooms) ? location.state.bedrooms : []
  );

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);

  const [facilityFilters, setFacilityFilters] = useState([]);
  const [commonFacilityFilters, setCommonFacilityFilters] = useState([]);

  const [sort, setSort] = useState("asc");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Number.MAX_VALUE);
  const [totalPages, setTotalPages] = useState(1);
  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(
      selectedItemsPerPage === -1 ? Number.MAX_VALUE : selectedItemsPerPage
    );
    setPage(1);
  };
  const handlePageChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    setPage(selectedPage);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const facilities = [facilityFilters]; // Replace with your list of facility names
  const commonfacilities = [commonFacilityFilters]; // Replace with your list of facility names

  // Encode the facility names as a comma-separated string

  const url = `property?branch=${encodeURIComponent(
    destination
  )}&furnitured=${encodeURIComponent(furnitured)}&type=${encodeURIComponent(
    gender
  )}&category=${encodeURIComponent(category)}&min=${encodeURIComponent(
    min
  )}&max=${encodeURIComponent(max)}&facility=${encodeURIComponent(
    facilities
  )}&commonfacility=${encodeURIComponent(
    commonfacilities
  )}&sort=${sort}&page=${page}&pageSize=${itemsPerPage}`;

  const { data, loading, error, reFetch } = UseFetch(url);

  const handlePriceFilterChange = (minPrice, maxPrice) => {
    setMin(minPrice);
    setMax(maxPrice);
  };

  // ... rest of your component ...

  const handleFacilityFilterChange = (facility) => {
    setFacilityFilters((prevFilters) => {
      // If the facility is already in the filters, remove it
      if (prevFilters.includes(facility)) {
        return prevFilters.filter((item) => item !== facility);
      } else {
        // If the facility is not in the filters, add it
        return [...prevFilters, facility];
      }
    });
  };
  const handleCommonFacilityFilterChange = (commonfacility) => {
    setCommonFacilityFilters((prevFilters) => {
      // If the commonfacility is already in the filters, remove it
      if (prevFilters.includes(commonfacility)) {
        return prevFilters.filter((item) => item !== commonfacility);
      } else {
        // If the commonfacility is not in the filters, add it
        return [...prevFilters, commonfacility];
      }
    });
  };

  useEffect(() => {
    // Call reFetch whenever facilityFilters or itemsPerPage state changes
    reFetch(true);
  }, [
    page,
    itemsPerPage,
    facilityFilters,
    commonFacilityFilters,
    sort,
    min,
    max,
  ]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } else {
      setTotalPages(1);
    }
  }, [data, itemsPerPage]);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  // ... rest of your component code
  const filteredData = paginatedData.filter((item) => {
    if (
      (bedrooms.length > 0 && !bedrooms.includes(item?.bedroom?.toString())) ||
      (category !== "" && item.category.name !== category)
    ) {
      return false;
    }
    // Check facility filters

    if (facilityFilters.length > 0) {
      const hasFacilities = facilityFilters.some((facility) => {
        return (
          item.facility &&
          item.facility.some(
            (facilityItem) =>
              facilityItem?.name &&
              facilityItem?.name.toLowerCase().includes(facility.toLowerCase())
          )
        );
      });
      if (!hasFacilities) {
        return false;
      }
    }
    if (commonFacilityFilters.length > 0) {
      const hasFacilities = commonFacilityFilters.some((commonfacility) => {
        return (
          item.commonfacility &&
          item.commonfacility.some(
            (facilityItem) =>
              facilityItem?.name &&
              facilityItem?.name
                .toLowerCase()
                .includes(commonfacility.toLowerCase())
          )
        );
      });
      if (!hasFacilities) {
        return false;
      }
    }

    // Add more filtering conditions if needed
    // ...
    return true;
  });
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);

  return (
    <div>
      <div className="mt-3 flex justify-between">
        <p>{filteredData.length} Results Found</p>
        <p className="md:mr-[650px]">
          Search Number{" "}
          <select
            className="border border-black rounded ml-2"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ width: 50, height: 32 }}
          >
            <option value={-1}>All</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </p>
      </div>
      {/* <Header type="list" /> */}
      <div className="mt-5">
        <div className="listFilterSm">
          <div
            className="flex justify-center mb-4 fixed bottom-0 p-4  w-full filterZindex"
            style={{ zIndex: 9999, width: "95%" }}
          >
            <div className="filter" onClick={() => handleOpen("xxl")}>
              <i className="fa-solid fa-filter mt-2"></i>
              <h6 className="ms-3"> Filter</h6>
            </div>
          </div>

          <Dialog
            open={size === "xxl"}
            size={size || "md"}
            handler={handleOpen}
          >
            <div>
              <Button
                variant="text"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <i
                  className="fa-solid fa-arrow-left text-3xl"
                  style={{ color: "#00bbb4" }}
                ></i>
              </Button>
            </div>
            <DialogHeader>
              {" "}
              <div className="input-filed-area">
                <div className="location-icon">
                  <img
                    src={location}
                    style={{
                      color: "#00bbb4",
                      width: "20px",
                      height: "20px",
                      marginTop: "14px",
                    }}
                    alt=""
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogBody divider>
              <div className="flex flex-col items-start col-span-12  sm:col-span-12 right-side lg:col-span-4">
                <div className="filter_card w-full text-start p-5 filter_card_sm_height">
                  <ListFilter
                    handleFacilityFilterChange={handleFacilityFilterChange}
                    handleCommonFacilityFilterChange={
                      handleCommonFacilityFilterChange
                    }
                    handleSortChange={handleSortChange}
                    handlePriceFilterChange={handlePriceFilterChange}
                    commonFacilityFilters={commonFacilityFilters}
                    facilityFilters={facilityFilters}
                    sort={sort}
                    min={min}
                    max={max}
                  />
                </div>
              </div>
            </DialogBody>
          </Dialog>
        </div>
        <div className="grid grid-cols-12">
          <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-8">
            {loading ? (
              "Loading"
            ) : filteredData?.length > 0 ? (
              <>
                {filteredData.map((item) => (
                  <HotelsList key={item._id} item={item} />
                ))}
              </>
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
          <div className="flex flex-col items-start col-span-12  sm:col-span-12 right-side lg:col-span-4">
            <div className="filter_card w-full text-start p-5 listFilterLg">
              <ListFilter
                handleFacilityFilterChange={handleFacilityFilterChange}
                handleCommonFacilityFilterChange={
                  handleCommonFacilityFilterChange
                }
                handleSortChange={handleSortChange}
                handlePriceFilterChange={handlePriceFilterChange}
                commonFacilityFilters={commonFacilityFilters}
                facilityFilters={facilityFilters}
                sort={sort}
                min={min}
                max={max}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-10 flex justify-center items-center mb-10">
        <div className="bg-[#399] text-white rounded px-2 py-2">
          <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous Page
            </button>
          </div>
        </div>
        <div className="flex ml-2 mx-2">
          <p>Page</p>
          <select
            className="border border-black rounded ml-2"
            value={page}
            onChange={handlePageChange}
            style={{ width: 50, height: 26 }}
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNum) => (
                <option key={pageNum} value={pageNum}>
                  {pageNum}
                </option>
              )
            )}
          </select>
          <p className="ml-2"> of {totalPages}</p>
        </div>
        <div className="flex items-center bg-[#399] text-white rounded px-2 py-2">
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
