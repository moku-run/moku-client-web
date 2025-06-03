import MatchChatCard from "../components/MatchChatCard";
import "../styles/PlayStatusContainer.css";
import MatchUpContainer from "./MatchUpContainer";

const PlayStatusContainer = () => {
  return (
    <div className="playStatusContainer">
      <MatchUpContainer />
      <MatchChatCard />
    </div>
  );
};

export default PlayStatusContainer;
