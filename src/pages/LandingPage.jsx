import "../styles/pages/LandingPage.css";
import LeftContainer from "../components/LeftContainer";
import LoginContainer from "../containers/LoginContainer";

const LandingPage = () => {
  return (
    <div className="contentWrapper">
      <LeftContainer />

      <div className="rightContent">
        <LoginContainer />
      </div>
    </div>
  );
};

export default LandingPage;
