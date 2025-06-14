import "../styles/pages/LandingPage.css";
import LeftContainer from "../components/LeftContainer";
import StatsContainer from "../containers/StatsContainer";

const StatsPage = () => {
  return (
    <div className="contentWrapper">
      <LeftContainer />

      <div className="rightContent">
        <StatsContainer />
      </div>
    </div>
  );
};

export default StatsPage;
