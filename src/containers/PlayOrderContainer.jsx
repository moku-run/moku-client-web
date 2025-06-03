import "../styles/PlayOrderContainer.css";
import logo from "./../assets/logo/logo.png";
import Button from "../components/Button";

const PlayOrderContainer = () => {
  return (
    <div className="playOrderContainer">
      <img src={logo} className="playOrderLogo" />
      <div className="PlayButtonWrapper">
        <Button name="한 수 쉼" variant={"SECONDARY_BUTTON"} />
        <Button name="기권하기" variant={"PRIMARY_BUTTON"} />
      </div>
    </div>
  );
};

export default PlayOrderContainer;
