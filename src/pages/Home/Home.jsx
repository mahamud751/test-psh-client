import PromoOffer from "../../components/home/PromoOffer";
import Recommended from "../../components/home/Recommended";
import AllBranch from "../../components/home/AllBranch";
import Platform from "../../components/home/Platform";
import Review from "../../components/home/Review";

import Categories from "../../components/home/Categories";
import Facility from "../../components/home/Facility";
import Banner from "../../components/home/Banner";
import SearchBoxSm from "../../components/home/SearchBoxSm";

function Home() {
  return (
    <div className="text-start">
      <Banner />
      <SearchBoxSm />
      <Categories />
      <Facility />
      <PromoOffer />
      <Recommended />
      <AllBranch />
      <Platform />
      <Review />
    </div>
  );
}

export default Home;
