import "../styles/LeftContainer.css";
import logo from "./../assets/logo/logo.png";

const LeftContainer = () => {
  return (
    <div className="leftContainer">
      <img src={logo} className="logo" />
      <h4 className="copyRight">
        Copyright @ 2025 lkdcode All rights reserved
      </h4>
    </div>
  );
};

export default LeftContainer;
