import React, { useContext, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Dialog,
  CardBody,
  Input,
  Checkbox,
  CardFooter,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  MenuHandler,
  MenuList,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";
import line from "../../assets/img/Line 127.png";
import facebookIcon from "../../assets/img/facebook.svg";
import googleIcon from "../../assets/img/google.png";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { placeProfileMenu } from "../../redux/reducers/smProfileMenuSlice";
import LoginModal from "./LoginModal";
import { BsGift, BsTelephonePlus } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineAddLocationAlt, MdOutlineMapsHomeWork } from "react-icons/md";
import { AiOutlineFileUnknown, AiOutlineHome } from "react-icons/ai";
import UseFetch from "../../hooks/useFetch";

function ProfileMenu(id) {
  const { data } = UseFetch(`users/${id}`);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logoutUser();
  };

  const dispatch = useDispatch();
  return (
    <>
      <div className="md:block hidden">
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="candice wu"
                className="border border-blue-500 p-0.5"
                src={user?.photos}
              />

              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            <Link to={"/profile"} onClick={closeMenu}>
              <MenuItem className={`flex items-center gap-2 rounded `}>
                <Typography as="span" variant="small" className="font-normal">
                  {user?.firstName} {user?.lastName}
                </Typography>
              </MenuItem>
            </Link>
            <NavLink onClick={handleLogOut}>
              <MenuItem
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded `}
              >
                <Typography as="span" variant="small" className="font-normal">
                  Log out
                </Typography>
              </MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      </div>

      {/* For Mobile */}
      <Link to="/profile">
        <div
          className=" md:hidden sm:block "
          onClick={() => dispatch(placeProfileMenu(true))}
        >
          <Menu>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full "
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="candice wu"
                className="border border-blue-500 p-0.5"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </Button>
          </Menu>
        </div>
      </Link>
    </>
  );
}

export default function Navmenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const [size, setSize] = React.useState(null);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const handleOpen = (value) => setSize(value);
  const handleLogOut = () => {
    logoutUser();
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const { loginUser, registerUser } = useContext(AuthContext);
  const isProfileMenu = useSelector(
    (state) => state?.profileMenu?.isProfileMenu
  );
  const onSubmit = async (data) => {
    const { email, password } = data;

    await loginUser(email, password);
    navigate(location.state?.from || "/");
  };
  const onSubmitRegister = async (data) => {
    const { firstName, email, phone, password, refferCode } = data;

    await registerUser(firstName, email, phone, password, refferCode);
    navigate("/");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      {/* {user && (
        <Typography as="li" className="p-1 font-normal sm:block md:hidden">
          <Link to={"/personal-info/m-info"} className=" text-black">
            Dashboard
          </Link>
        </Typography>
      )} */}
      <Typography as="li" className="p-1 font-normal ">
        <Link
          to={"/"}
          className=" flex items-center text-black hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <AiOutlineHome
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          Home
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal ">
        <Link
          to={"/leas-property"}
          className=" flex items-center text-black hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <MdOutlineMapsHomeWork
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          Lease Your Property
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link
          to={"/"}
          className="flex items-center hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <MdOutlineAddLocationAlt
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          Popular Area
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link
          to={"/about"}
          className="flex items-center hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <AiOutlineFileUnknown
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          About us
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link
          to={"/contact"}
          className="flex items-center hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <BsTelephonePlus
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          Contact
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link
          to={"/"}
          className="flex items-center hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <FaHandsHelping
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          PSH for Business
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link
          to={"/promo"}
          className="flex items-center hover:text-[#00bbb4] md:ml-0 sm:ml-5"
        >
          <div className="md:hidden sm:block">
            <BsGift
              style={{ width: "24px", height: "24px" }}
              className="mr-2"
            />
          </div>
          Promo
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="bg-white navbar_sticky shadow-md">
      <div className=" flex custom-container ">
        <Navbar className="py-2 lg:py-2 shadow-none px-0">
          <div className="flex items-center justify-between text-blue-gray-900 ">
            <div style={{ marginLeft: 15 }}>
              <Link to={"/"}>
                <img
                  src={"https://i.ibb.co/GpqY8tQ/PSH-web-logo-1.png"}
                  alt=""
                />
              </Link>
            </div>
            <div className="contents">
              <div className="mr-4 hidden lg:block ">{navList}</div>

              <div className="flex justify-end sm:w-full md:w-auto">
                <div className="sm:block md:hidden">
                  {user && <ProfileMenu />}
                </div>
              </div>
              {/* <div className="sm:block md:hidden">
                {user && <ProfileMenu />} */}
              <IconButton
                variant="text"
                className="mr-3 ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="sm:hidden md:block">
                {user ? (
                  <ProfileMenu />
                ) : (
                  <>
                    <div className="md:block">
                      <button
                        className="sign_btn sm:text-[14px] md:text-[16px]"
                        onClick={() => handleOpen("sm")}
                      >
                        Sign Up/Login
                      </button>
                    </div>
                    <>
                      <LoginModal handleOpen={handleOpen} size={size} />
                    </>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <Collapse open={openNav}>
              <div onClick={() => setOpenNav(!openNav)}>{navList}</div>
              <div className="">
                <div className="flex justify-center items-center gap-x-1 w-full ">
                  {user ? (
                    ""
                  ) : (
                    // <>
                    //   <NavLink onClick={handleLogOut}>
                    //     <MenuItem
                    //       className={`flex items-center gap-2 rounded `}
                    //     >
                    //       <button className="sign_out uppercase ">
                    //         Log Out
                    //       </button>
                    //     </MenuItem>
                    //   </NavLink>
                    // </>
                    <div className="md:block">
                      <button
                        className="sign_btn uppercase"
                        onClick={() => handleOpen("xl")}
                      >
                        Sign Up/Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Collapse>
          </div>
        </Navbar>
      </div>
    </div>
  );
}
