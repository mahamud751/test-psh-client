import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

import { FaBed } from "react-icons/fa";
import { BiBody } from "react-icons/bi";

import { GiSofa } from "react-icons/gi";
import DatePicker from "react-datepicker";

import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import UseFetch from "../../hooks/useFetch";
import { useRef } from "react";

const SearchBoxSm = () => {
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);

  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data, loading, error, reFetch } = UseFetch(`category`);
  const { data: branch } = UseFetch(`branch`);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);
  const [destination, setDestination] = useState("");

  const [inputActive, setInputActive] = useState(false);
  const filteredData = branch.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputActive(false);
      }
    };

    if (inputActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [inputActive]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuery(item.name);
    setInputActive(false);
    setDestination(item.name);
  };

  useEffect(() => {
    reduxDispatch(toTalRent());

    if (customerRent.remainingDays < 1) {
      reduxDispatch(rightDate(addDays(new Date(startDate), 1)));
    }
  }, [startDate, endDate, customerRent?.remainingDays]);

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  const [bedrooms, setBedrooms] = useState([]);

  const [furnituredDisplay, setFurnituredDisplay] = useState("");
  const [furnituredQuery, setFurnituredQuery] = useState("");
  const [furnituredValue, setFurnituredValue] = useState(0);
  const furnitures = ["All", "Furnitured", "UnFurnitured"];

  const [genderDisplay, setGenderDisplay] = useState("");
  const [genderQuery, setGenderQuery] = useState("female");
  const [genderValue, setGenderValue] = useState(0);
  const gender = ["Female", "Male"];
  // const gender = ["All", "Male", "Female", "Others"];

  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoryValue, setCategoryValue] = useState(0);
  const category = ["All", ...data.map((item) => item?.name)];
  const beds = ["All", "Bunk Bed", "1 BR", "2 BR", "3 BR"];
  const [bedValue, setBedValue] = useState(0);

  const handleFurnitureSelection = (index) => {
    setFurnituredValue(index);
    const selectedFurniture = furnitures[index];
    setFurnituredDisplay(selectedFurniture);

    // Map furnitures values to query values
    if (selectedFurniture === "Furnitured") {
      setFurnituredQuery("yes");
    } else if (selectedFurniture === "UnFurnitured") {
      setFurnituredQuery("no");
    }
  };

  const handleGenderSelection = (index) => {
    setGenderValue(index);
    const selectedGender = gender[index];
    setGenderDisplay(selectedGender);

    // Map gender values to query values
    if (selectedGender === "Female") {
      setGenderQuery("female");
    } else if (selectedGender === "Male") {
      setGenderQuery("male");
    }
    // } else if (selectedGender === "Others") {
    //   setGenderQuery("both");
    // }
  };

  const handleCategorySelection = (index) => {
    setCategoryValue(index);
    const selectedCategory = category[index];
    setCategoryDisplay(selectedCategory);

    // Map category values to query values
    if (selectedCategory === "All") {
      setCategoryQuery(""); // Empty string means no specific category filter
    } else {
      setCategoryQuery(selectedCategory);
    }

    // Handle bed selection based on category
    if (selectedCategory === "Private Room") {
    } else if (selectedCategory === "Shared Room") {
    } else if (selectedCategory === "Apartment") {
    } else {
      setBedValue(0); // Reset bed selection to "All" for other categories
      setBedrooms([]);
    }
  };

  const handleBedSelection = (index) => {
    if (categoryValue === 1) {
      // Private Room category
      if (beds[index] === "Bunk Bed") {
        // If 2 BR is selected, set bedrooms to ["2 BR"]
        setBedrooms(["Bunker"]);
      }
      setBedValue(index); // Update the selected bed value
    } else if (categoryValue === 2) {
      // Shared Room category
      if (index === 2) {
        setBedrooms(["1"]); // Set bedrooms to ["Bunker"] for Shared Room
      } else if (index === 3) {
        setBedrooms(["2"]); // Automatically select "1 BR" bed for Private Room
      } else {
        setBedrooms([`${index}`]); // Set bedrooms to the selected bed
      }
      setBedValue(index); // Update the selected bed value
    } else if (categoryValue === 3) {
      // Shared Room category
      if (beds[index] === 2) {
        setBedrooms(["1"]); // Set bedrooms to ["Bunker"] for Shared Room
      } else if (index === 3) {
        setBedrooms(["2"]); // Automatically select "1 BR" bed for Private Room
      } else if (index === 4) {
        setBedrooms(["3"]); // Automatically select "1 BR" bed for Private Room
      } else {
        setBedrooms([`${index}`]); // Set bedrooms to the selected bed
      }
      setBedValue(index); // Update the selected bed value
    } else {
      // Other categories
      if (index === 0) {
        // If "All" is selected, set bedrooms to an empty array
        setBedrooms([]);
      } else {
        setBedrooms([`${index}`]); // Set selected bedroom value for other categories
      }
      setBedValue(index); // Update the selected bed value
    }
  };

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    const payload = {
      destination,
      bedrooms: bedrooms.length > 0 ? bedrooms : "Any",
      furnitured: furnituredQuery,
      gender: genderQuery,
      category: categoryQuery,
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate("/list", { state: payload });
  };

  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);
  return (
    <div className="searchBoxSm">
      <div className="searchButton" onClick={() => handleOpen("xxl")}>
        <h6 className="text-black text-3xl "> Find Your Accommodation</h6>

        <i className="fa fa-search mt-2" />
      </div>

      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
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
        <DialogHeader> </DialogHeader>
        <DialogBody>
          <div>
            <div>
              <div className="input-filed-area mb-6" ref={inputRef}>
                <div className="location-icon">
                  <img
                    src="https://i.ibb.co/z8kf0jf/location.png"
                    style={{
                      color: "#00bbb4",
                      width: "20px",
                      height: "20px",
                      marginTop: "2px",
                    }}
                    alt="location"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  className="input_main"
                  ref={inputRef}
                  style={{
                    background: "none",
                    outline: "none",
                    width: "100%",
                    height: "40px",
                    paddingLeft: "40px",
                  }}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={() => setInputActive(true)}
                />
                {inputActive && (
                  <ul className="p-3">
                    {filteredData.map((item, index) => (
                      <li key={item._id} onClick={() => handleItemClick(item)}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="search-filed2">
                <ul className="flex justify-center main-search">
                  <li className="list-none py-1">
                    <span
                      onClick={() =>
                        reduxDispatch(
                          rightDate(addDays(new Date(startDate), 1))
                        )
                      }
                      className={` px-11 cursor-pointer py-2 ${
                        customerRent.remainingDays < getLastDayOfMonth() &&
                        customerRent.years === undefined
                          ? "dmyActive "
                          : "dmyNonActive"
                      }`}
                    >
                      Day
                    </span>
                  </li>
                  <li className="list-none py-1">
                    <span
                      onClick={() =>
                        reduxDispatch(
                          rightDate(addMonths(new Date(startDate), 1))
                        )
                      }
                      className={` px-11 cursor-pointer py-2 ${
                        customerRent.remainingDays >= getLastDayOfMonth() &&
                        customerRent.years === undefined
                          ? "dmyActive "
                          : "dmyNonActive"
                      }`}
                    >
                      Month
                    </span>
                  </li>
                  <li className="list-none py-1">
                    <span
                      onClick={() =>
                        reduxDispatch(rightDate(addYears(new Date(endDate), 1)))
                      }
                      className={` px-11 cursor-pointer py-2 ${
                        customerRent.years >= 1 ? "dmyActive " : "dmyNonActive"
                      }`}
                    >
                      Year
                    </span>
                  </li>
                </ul>

                <div className="flex mt-5 p-5">
                  <div className="flex">
                    <i
                      className="fa-solid fa-calendar-days me-2"
                      style={{ color: "#00bbb4" }}
                    ></i>
                    <DatePicker
                      selected={new Date(startDate)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => reduxDispatch(leftDate(date))}
                      minDate={subDays(new Date(), 0)}
                    />
                  </div>
                  <div className="flex">
                    <i
                      className="fa-solid fa-calendar-days me-2"
                      style={{ color: "#00bbb4" }}
                    ></i>
                    <DatePicker
                      selected={
                        customerRent?.remainingDays < 1
                          ? addDays(new Date(startDate), 1)
                          : new Date(endDate)
                      }
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => reduxDispatch(rightDate(date))}
                      minDate={subDays(new Date(startDate), -1)}
                    />
                  </div>
                </div>
                <div className="final-rent2">
                  <span className="final-rent2_text">
                    {`${
                      customerRent?.daysDifference >= 0
                        ? `${customerRent?.daysDifference} days`
                        : ""
                    }`}
                    {`${
                      customerRent?.months &&
                      customerRent?.days >= 0 &&
                      !customerRent?.years
                        ? `${customerRent?.months} months, ${customerRent?.days} days`
                        : ""
                    }`}
                    {`${
                      customerRent?.years &&
                      customerRent?.months >= 0 &&
                      customerRent?.days >= 0
                        ? `${customerRent?.years} year`
                        : ""
                    }`}
                  </span>
                </div>
                <hr style={{ margin: "5px 0" }} />
                <ul
                  className="flex title-search category_sm "
                  style={{ marginTop: "23px" }}
                >
                  <li className="sm:text-[10px]">
                    <span
                      className={`tab ${categoryValue === 0 ? "selected" : ""}`}
                      onClick={() => handleCategorySelection(0)}
                    >
                      All
                    </span>
                  </li>
                  {data.map((rent, index) => (
                    <li key={index + 1} className="sm:text-[10px]">
                      <span
                        className={`tab ${
                          categoryValue === index + 1 ? "selected" : ""
                        }`}
                        onClick={() => handleCategorySelection(index + 1)}
                      >
                        {rent?.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Rent Styled Searching */}
                <div className="flex justify-between">
                  <div>
                    <div className="flex justify-center ">
                      <FaBed
                        style={{
                          color: "#339999",
                          height: "24px",
                          width: "24px",
                          marginTop: "25px",
                          marginRight: "12px",
                        }}
                      />
                    </div>

                    <div>
                      <ul
                        className={` styled-search-2 mt-3 ${
                          categoryValue === 2 ? "hide-search-options" : ""
                        }`}
                      >
                        {beds.map((bed, index) => {
                          if (
                            (categoryValue === 1 && bed !== "Bunker") ||
                            (categoryValue === 2 &&
                              bed !== "1 BR" &&
                              bed !== "2 BR") ||
                            (categoryValue === 3 &&
                              bed !== "All" &&
                              bed !== "1 BR" &&
                              bed !== "2 BR" &&
                              bed !== "3 BR")
                          ) {
                            return null; // Skip rendering
                          }

                          return (
                            <li key={index} className="my-4">
                              <span
                                onClick={() => handleBedSelection(index)}
                                className={`${
                                  bedValue === index
                                    ? "bedActive"
                                    : "bedNonActive"
                                } `}
                              >
                                {bed}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <ul className=" styled-search-2 mt-6">
                      <li className="flex justify-center">
                        <GiSofa
                          style={{
                            color: "#339999",
                            height: "24px",
                            width: "24px",
                            marginTop: "2px",
                            marginRight: "12px",
                          }}
                        />
                      </li>
                      {furnitures.map((furniture, index) => (
                        <li key={index} className="my-4">
                          <span
                            onClick={() => handleFurnitureSelection(index)}
                            className={`${
                              furnituredValue === index
                                ? "bedActive"
                                : "bedNonActive"
                            }`}
                          >
                            {furniture}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="styled-search-2 mt-6">
                      <li className="flex justify-center">
                        <BiBody
                          style={{
                            color: "#339999",
                            height: "24px",
                            width: "24px",
                            marginTop: "2px",
                            marginRight: "12px",
                          }}
                        />
                      </li>
                      {gender.map((gender, index) => (
                        <li key={index} className="my-4">
                          <span
                            onClick={() => handleGenderSelection(index)}
                            className={`${
                              genderValue === index
                                ? "bedActive"
                                : "bedNonActive"
                            }`}
                          >
                            {gender}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="mt-7 fixed bottom-0"
                  style={{ width: "87%", marginLeft: "10px" }}
                >
                  <hr style={{ margin: "20px 0" }} />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <button
                      onClick={handleSearch}
                      style={{
                        width: "100%",
                        backgroundColor: "#00bbb4",
                        border: "none",
                        color: "white",
                        padding: "15px 10px",
                        borderRadius: "5px",
                        marginTop: "12px",
                      }}
                    >
                      Find Accomodation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  );
};

export default SearchBoxSm;
