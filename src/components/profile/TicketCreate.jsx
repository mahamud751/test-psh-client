import "./Ticket.css";
import { Input, Radio } from "@material-tailwind/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../contexts/UserProvider";
import axios from "axios";

import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
const TicketCreate = ({ handleOpen, open }) => {
  const [issue, setIssue] = useState("Air Condition Problem");
  // const [allBranch] = useBranch();
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [branch, SetBranch] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const formRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.psh.com.bd/api/branch");
        SetBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      email: formData.get("email"),
      type: formData.get("type"),
      category: formData.get("category"),
      subCategory: selectedSubCategory,
      branchId: formData.get("branch"),
    };
    try {
      const product = {
        ...data2,
      };

      await axios.post("https://api.psh.com.bd/api/issue", product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      // MySwal.fire("Something Error Found.", "warning");
    }
  };
  const issueSubCategories1 = [
    "Ac Not Working",
    "No Remote",
    "Not Remote Working",
    "Not Remote Working",
    "Ac Issue",
    "Not Remote Working",
    "Other",
  ];
  const issueSubCategories2 = [
    "Ac Working Problem",
    "No Remote",
    "Not Remote Working",
    "Not Remote Working",
    "Ac Issue",
    "Not Remote Working",
  ];
  const [issueSubValue, setIssuSubValue] = useState(0);
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {" "}
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "inter" }}>
            Create a Ticket
          </h2>
        </DialogHeader>
        <DialogBody
          divider
          className="xl:h-[850px] h-[500px]  overflow-y-auto xl:overflow-hidden"
        >
          <div className="px-10">
            <h3 className="text-xl">Issue For</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="flex gap-8 ">
                <Radio
                  name="type"
                  label="My Room"
                  value="my-room"
                  defaultChecked
                />
                <Radio name="type" label="Common Area" value="common-area" />
                <Radio name="type" label="Payment" value="payment" />
              </div>
              <div>
                <label htmlFor="inputState" className="profile_label3">
                  Branch
                </label>
                <select
                  name="branch"
                  id="inputState"
                  className="w-3/5 h-9 border rounded mt-2 border-black"
                >
                  <option selected>Select Branch</option>
                  {branch.map((pd) => (
                    <option key={pd._id} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <h3 className="text-xl">Issu Category</h3>
                <select
                  className="w-3/5 h-9 border rounded mt-2 border-black"
                  onChange={(e) => setIssue(e.target.value)}
                  name="category"
                >
                  <option>Air Condition Problem</option>
                  <option>Room Problem</option>
                </select>
              </div>
              {/* Sub Category */}
              <div className="mt-5 mb-5">
                <h3 className="text-xl">Sub Category</h3>
                {issue === "Air Condition Problem" ? (
                  <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                    {issueSubCategories1.map((issue, index) => (
                      <div
                        className="mt-6"
                        onClick={() => {
                          setIssuSubValue(index);
                          setSelectedSubCategory(issue); // Update the selected sub-category
                        }}
                      >
                        <span
                          className={`${
                            issueSubValue === index
                              ? "bg-[#399] text-white border-none "
                              : ""
                          } border border-black rounded-[15px] px-5 py-1.5 cursor-pointer`}
                        >
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {issue === "Room Problem" ? (
                  <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                    {issueSubCategories2.map((issue, index) => (
                      <div
                        className="mt-6"
                        onClick={() => {
                          setIssuSubValue(index);
                          setSelectedSubCategory(issue); // Update the selected sub-category
                        }}
                      >
                        <span
                          className={`${
                            issueSubValue === index
                              ? "bg-[#399] text-white border-none "
                              : ""
                          } border border-black rounded-[15px] px-5 py-1.5 cursor-pointer`}
                        >
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* Issu Title */}
              <div className="issu_title ">
                <h3 className="text-xl">Issu Title</h3>
                <input
                  type="text"
                  className=" rounded mt-2 h-10 pl-3 w-full"
                  placeholder="Problem"
                  name="name"
                />
              </div>
              <div className="mt-5" style={{ display: "none" }}>
                <Input
                  variant="static"
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  defaultValue={user.email || ""}
                />
              </div>
              {/* Issu Description */}
              <div className="issu_title mt-5 ">
                <h3 className="text-xl">Description</h3>
                <textarea
                  className="w-full rounded mt-2 h-28  p-3"
                  placeholder="Write about your Problem "
                  name="desc"
                />
              </div>
              <div className="flex justify-end" onClick={handleOpen}>
                <button
                  type="submit"
                  className="bg-[#35B0A7] rounded px-10 py-3 text-white mt-2"
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </DialogBody>
        <div
          onClick={() => handleOpen(null)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span>
            <AiOutlineClose style={{ width: "30px", height: "30px" }} />
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default TicketCreate;
