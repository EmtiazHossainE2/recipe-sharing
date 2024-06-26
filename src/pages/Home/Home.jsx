import { Helmet } from "react-helmet-async";
import { Banner, Counter, DevInfo, SuccessStories } from "../../components/Home";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Recipe Sharing | Home</title>
      </Helmet>
      <Banner />
      <Counter />
      <SuccessStories />
      <DevInfo />
    </div>
  );
};

export default Home;
