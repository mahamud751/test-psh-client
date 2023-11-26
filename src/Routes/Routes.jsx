import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Success from "../pages/Success/Success";
import Profile from "../pages/Profile/Profile";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import SignIn from "../pages/SignUp/SignIn";
import Room from "../pages/Details/Room";
import Checkout from "../pages/Checkout/Checkout";
import Category from "../pages/Single/Category";
import List from "../pages/List/List";
import PrivateRoute from "./PrivateRoute";
import Branch from "../pages/Details/Branch";
import PersonalInfo from "../pages/Booking/PersonalInfo";
import BookNow from "../pages/Booking/BookNow";
import Invoice from "../pages/Invoice/Invoice";
import LeasProperty from "../pages/LeasProperty/LeasProperty";
import Promo from "../pages/Details/Promo";
import PromoList from "../pages/Promo/Promo";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import Booking from "../components/profile/Booking";
import Personal from "../components/profile/Personal";
import Payment from "../components/profile/Payment";
import WishList from "../components/profile/WishList";
import TicketList from "../components/profile/TicketList";
import Setting from "../components/profile/Setting";
import Vouchers from "../components/profile/Vouchers";
import Community from "../components/profile/Community";
import EditProfile from "../components/profile/EditProfile";
import Referral from "../components/profile/Referral";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/list",
        element: <List></List>,
      },
      {
        path: "/leas-property",
        element: <LeasProperty />,
      },
      {
        path: "/room/:id",
        element: <Room></Room>,
      },
      {
        path: "/promo",
        element: <PromoList></PromoList>,
      },
      {
        path: "/promo/:id",
        element: <Promo></Promo>,
      },
      {
        path: "/branch/:id",
        element: <Branch></Branch>,
      },
      {
        path: "/category",
        element: <Category></Category>,
      },

      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/success",
        element: <Success></Success>,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/personal-info",
        element: <PersonalInfo />,
      },
    ],
  },

  {
    path: "/booking-now",
    element: (
      <PrivateRoute>
        <BookNow></BookNow>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/booking-now",
        element: <BookNow></BookNow>,
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <Checkout></Checkout>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
    ],
  },
]);
