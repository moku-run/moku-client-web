import "../styles/MokuPage.css";
import PlayOrderContainer from "../containers/PlayOrderContainer";
import PlayBoardContainer from "../containers/PlayBoardContainer";
import PlayStatusContainer from "../containers/PlayStatusContainer";

const MokuPage = () => {
  return (
    <div className="mokuPage">
      <div className="mokuOrderContainer">
        <PlayOrderContainer />
      </div>
      <div className="mokuBoardContainer">
        <PlayBoardContainer />
      </div>
      <div className="mokuStatusContainer">
        <PlayStatusContainer />
      </div>
    </div>
  );
};

export default MokuPage;
