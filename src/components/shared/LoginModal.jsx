import React, { useContext, useState } from "react";
import { Dialog, CardBody } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/UserProvider";
import facebookIcon from "../../assets/img/facebook.svg";
import googleIcon from "../../assets/img/google.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
const LoginModal = ({ handleOpen, size, isLoginModalOpen }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  //   const handleOpen = (value) => setSize(value);
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
  return (
    <div>
      <Dialog
        open={size === "sm" || size === "xl"}
        size={size || "md"}
        handler={handleOpen}
        className="sm:overflow-scroll md:overflow-auto sm:h-full  md:h-auto sm:p-22 md:p-0"
        // style={{ overflow: "scroll", height: "100vh" }}
      >
        <div className="mx-auto ">
          <CardBody className="border-0 shadow-none">
            <div
              className="flex justify-end text-3xl text-black"
              onClick={() => handleOpen()}
            >
              <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
            </div>
            {showSignIn && (
              <>
                <div className="flex justify-around">
                  <div>
                    <h2 className="text-[36px] font-[600]">Login</h2>
                    <p className="my-2">
                      Welcome Back To{" "}
                      {/* <span className="font-bold">Project Second Home</span> */}
                    </p>
                  </div>
                  <Link to={"/"}>
                    <img
                      src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                      alt="pharmacy"
                      className="img-fluid sm:w-[70px] md:w-[70px]"
                    />
                  </Link>
                </div>
                <form className="infoForm " onSubmit={handleSubmit(onSubmit)}>
                  <div className="form">
                    <label htmlFor="Email" className="mt-5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="infoInput"
                      placeholder="Username or Email"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    <label htmlFor="Email">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="infoInput"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be 6 characters long",
                        },
                        // pattern: {
                        //   value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                        //   message:
                        //     "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                        // },
                      })}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      style={{
                        border: "none",
                        marginLeft: -40,
                        width: 40,
                        height: 60,
                      }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="flex remember-switch md:px-10">
                    <div className="flex items-center mt-2">
                      <div>
                        <Switch />
                      </div>
                      <div className="mt-[-6px]">
                        <span className="ml-2 text-sm">Remember me</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[#35B0A7]">Forgot Password</span>
                    </div>
                  </div>
                  <div>
                    <button className="w-full p-3 border-0 rounded-lg uppercase bg-[#00BBB4] text-white font-bold">
                      Log In
                    </button>
                  </div>
                  <div className="flex divider px-8">
                    <div>
                      <span className="text-sm">OR SIGN UP WITH</span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="md:w-[280px] sm:w-[140px]">
                      <div
                        className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                        style={{
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <div>
                          <img src={facebookIcon} alt="" />
                        </div>
                        <div className="ml-3 ">
                          <span>Facebook</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-[280px] sm:w-[140px]">
                      <div
                        className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                        style={{
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <div>
                          <img src={googleIcon} alt="" />
                        </div>
                        <div className="ml-3 ">
                          <span>Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <span>Don’t have an account? </span>
                    </div>
                    <div>
                      <button
                        className="text-[#00A1FF]"
                        onClick={() => {
                          setShowSignIn(false);
                          setShowSignUp(true);
                        }}
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
            {showSignUp && (
              <div className="w-full h-full">
                <div>
                  <div className="flex justify-around">
                    <div>
                      <h2 className="text-[36px] font-[600]">Login</h2>
                      <p className="my-2">
                        Welcome Back To{" "}
                        {/* <span className="font-bold">Project Second Home</span> */}
                      </p>
                    </div>
                    <Link to={"/"}>
                      <img
                        src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                        alt="pharmacy"
                        className="img-fluid sm:w-[70px] md:w-[70px]"
                      />
                    </Link>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitRegister)}>
                    <div>
                      <div className="grid grid-cols-12 md:gap-4">
                        <div className="flex flex-col items-start col-span-12 sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Full Name</label>
                          <input
                            type="text"
                            className="infoInput"
                            placeholder="Full Name"
                            {...register("firstName", {
                              required: "Name is Required",
                            })}
                          />
                          {errors.firstName && (
                            <p className="text-red-500">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Email Address</label>
                          <input
                            type="email"
                            className="infoInput"
                            placeholder="Email Address"
                            {...register("email", {
                              required: true,
                            })}
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Phone Number</label>
                          <input
                            type="text"
                            className="infoInput"
                            placeholder="Phone Number"
                            {...register("phone", {
                              required: true,
                            })}
                          />
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div className=" items-start col-span-12  sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="infoInput"
                            placeholder="Password"
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message: "Password must be 6 characters long",
                              },
                              // pattern: {
                              //   value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                              //   message:
                              //     "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                              // },
                            })}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            style={{
                              border: "none",
                              marginLeft: -40,
                              width: 40,
                            }}
                          >
                            {showPassword ? (
                              <i className="fa-solid fa-eye"></i>
                            ) : (
                              <i className="fa-solid fa-eye-slash"></i>
                            )}
                          </button>

                          {errors.password && (
                            <p className="text-red-500">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="items-start col-span-12  sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Confirm Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="infoInput"
                            placeholder="Password"
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message: "Password must be 6 characters long",
                              },
                              // pattern: {
                              //   value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                              //   message:
                              //     "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                              // },
                            })}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            style={{
                              border: "none",
                              marginLeft: -40,
                              width: 40,
                            }}
                          >
                            {showPassword ? (
                              <i className="fa-solid fa-eye"></i>
                            ) : (
                              <i className="fa-solid fa-eye-slash"></i>
                            )}
                          </button>
                          {errors.password && (
                            <p className="text-red-500">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-6 md:inline-block form">
                          <label htmlFor="Email">Refers Code</label>
                          <input
                            type="text"
                            className="infoInput"
                            placeholder="Enter Refer Code"
                            {...register("refferCode", {})}
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[12px]">
                          By Signing up, you agree the Terms and Conditions and
                          Privacy Policy.
                        </span>
                      </div>
                    </div>

                    <div className="px-8">
                      <button className="w-full p-3 border-0 rounded uppercase bg-[#00BBB4] text-white">
                        Sign Up
                      </button>
                    </div>
                    <div className="flex divider px-8">
                      <div>
                        <span className="text-sm">OR SIGN UP WITH</span>
                      </div>
                    </div>
                    <div className="flex justify-around py-2">
                      <div className="md:w-[280px] sm:w-[140px]">
                        <div
                          className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                          style={{
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div>
                            <img src={facebookIcon} alt="" />
                          </div>
                          <div className="ml-3">
                            <span>Facebook</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-[280px] sm:w-[140px] px-3">
                        <div
                          className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                          style={{
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div>
                            <img src={googleIcon} alt="" />
                          </div>
                          <div className="ml-3 ">
                            <span>Google</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-full text-center">
                      <div>
                        <span>Do you have an account?</span>
                      </div>
                      <div className="ms-2">
                        <button
                          className="text-[#00A1FF]"
                          onClick={() => {
                            setShowSignIn(true);
                            setShowSignUp(false);
                          }}
                        >
                          Log in{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </CardBody>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginModal;
