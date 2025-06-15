import "../styles/pages/LandingPage.css";
import LeftContainer from "../components/LeftContainer";
import SignUpContainer from "../containers/SignUpContainer";

const SignUpPage = () => {
  return (
    <div className="contentWrapper">
      <LeftContainer />

      <div className="rightContent">
        <SignUpContainer />
      </div>
    </div>
  );
};

export default SignUpPage;
