import React, { useEffect, useRef } from "react";
import "./SearchBox.css";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
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

const SearchBox = () => {
  const reduxDispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);

  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);
  const { data } = UseFetch(`category`);

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

  return (
    <div className="searchBox">
      <div className="flex justify-center mt-3 ">
        <div className="search-filed">
          <ul className="flex main-search mt-5">
            <li className="list-none py-1">
              <span
                onClick={() =>
                  reduxDispatch(rightDate(addDays(new Date(startDate), 1)))
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
                  reduxDispatch(rightDate(addMonths(new Date(startDate), 1)))
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
          <ul className="flex title-search" style={{ marginTop: "10px" }}>
            <li>
              <span
                className={`tab ${categoryValue === 0 ? "selected" : ""}`}
                onClick={() => handleCategorySelection(0)}
              >
                All
              </span>
            </li>
            {data.map((rent, index) => (
              <li key={index + 1}>
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
          <div className="input-filed-area" ref={inputRef}>
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
              <ul className="p-2 absolute bg-white border border-[#00bbb4] rounded">
                {filteredData.map((item, index) => (
                  <li
                    key={item._id}
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-[#00bbb4] hover:text-white cursor-pointer px-2 rounded "
                    style={{ width: "404px" }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            {/* <Autosuggest
              className=""
              suggestions={
                filteredSuggestions.length > 0
                  ? filteredSuggestions
                  : suggestions
              }
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                placeholder: "Where do you want to stay?",
                value,
                onChange,
                
                onFocus: onSuggestionsFetchAllRequested,
                className: "input_main",
                style: {
                  background: "none",
                  outline: "none",
                  color: "darkgrey",
                  width: "100%",
                  height: "40px",
                  paddingLeft: "40px",
                },
              }}
            /> */}
            <div className="location-icon ">
              <img
                src="https://i.ibb.co/z8kf0jf/location.png"
                style={{ color: "#00bbb4", width: "20px", height: "20px" }}
                alt="location"
              />
            </div>

            <div className="left-date">
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
            <div className="right-date" style={{ backgroundColor: "unset" }}>
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

            <div className="vl"></div>
            <div className="vl2"></div>

            <div className="arrow-icon">
              <BsArrowRight />
            </div>
            <div className="arrow-icon2">
              <BsArrowRight />
            </div>
            <div className="final-rent">
              <span>
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
          </div>
          {/* Rent Styled Searching */}
          <div className="flex items-center">
            <div>
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

            <div style={{ marginTop: "19px" }}>
              <ul
                className={`flex styled-search-1 mt-3 ${
                  categoryValue === 2 ? "hide-search-options" : ""
                }`}
              >
                {beds.map((bed, index) => {
                  if (
                    (categoryValue === 1 && bed !== "Bunk Bed") ||
                    (categoryValue === 2 && bed !== "1 BR" && bed !== "2 BR") ||
                    (categoryValue === 3 &&
                      bed !== "All" &&
                      bed !== "1 BR" &&
                      bed !== "2 BR" &&
                      bed !== "3 BR")
                  ) {
                    return null; // Skip rendering
                  }

                  return (
                    <li key={index}>
                      <span
                        onClick={() => handleBedSelection(index)}
                        className={`${
                          bedValue === index ? "bedActive" : "bedNonActive"
                        }`}
                      >
                        {bed}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className="flex justify-between items-center "
            style={{ marginTop: "7px" }}
          >
            <ul className="flex styled-search-1 mt-3 ">
              <li>
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
                <li key={index}>
                  <span
                    onClick={() => handleFurnitureSelection(index)}
                    className={`${
                      furnituredValue === index ? "bedActive" : "bedNonActive"
                    }`}
                  >
                    {furniture}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex styled-search-1 mt-3">
              <li>
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
                <li key={index}>
                  <span
                    onClick={() => handleGenderSelection(index)}
                    className={`${
                      genderValue === index ? "bedActive" : "bedNonActive"
                    }`}
                  >
                    {gender}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <button
                onClick={handleSearch}
                style={{
                  backgroundColor: "#00bbb4",
                  border: "none",
                  color: "white",
                  padding: "7px 10px",
                  borderRadius: "5px",
                  marginTop: "12px",
                  width: 260,
                }}
              >
                Find Accommodation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
