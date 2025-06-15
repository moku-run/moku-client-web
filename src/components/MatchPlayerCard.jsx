import "../styles/MatchPlayerCard.css";
import Stone from "./Stone";
import player from "../assets/emoji/player.svg";

const MatchPlayerCard = ({ turn = true, stoneColor }) => {
  return (
    <div className="matchPlayerCard">
      <div className={`turnWrapper`}>
        <Stone variant={stoneColor} />
        <div className={`${turn ? "matchTurn" : ""}`}>20s</div>
      </div>
      <div className={`playerImgWrapper ${turn ? "" : "notMatchTurnImg"}`}>
        <img src={player} className={`playerImg `} />
      </div>
      <div className="recordWrapper">
        <div className={`matchNickname ${turn ? "" : "notMatchTurn"}`}>
          홍길동
        </div>
        <div className={`matchRecord ${turn ? "" : "notMatchTurn"}`}>
          32전 3승 29패
        </div>
        <div className={`matchRate ${turn ? "" : "notMatchTurn"}`}>9.37%</div>
      </div>
    </div>
  );
};

export default MatchPlayerCard;
