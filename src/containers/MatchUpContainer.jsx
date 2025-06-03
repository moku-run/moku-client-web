import MatchPlayerCard from "../components/MatchPlayerCard";
import "../styles/MatchUpContainer.css";

const MatchUpContainer = () => {
  return (
    <div className="matchUpContainer">
      <MatchPlayerCard turn={true} stoneColor="BLACK_STONE" />
      <MatchPlayerCard turn={false} stoneColor="WHITE_STONE" />
    </div>
  );
};

export default MatchUpContainer;
