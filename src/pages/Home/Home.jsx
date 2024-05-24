import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import SuccessStories from "./SuccessStories";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Recipe Sharing | Home</title>
      </Helmet>
      <Banner />
      <SuccessStories />
    </div>
  );
};

export default Home;
