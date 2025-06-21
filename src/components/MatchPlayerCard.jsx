import "../styles/MatchPlayerCard.css";
import Stone from "./Stone";
import player from "../assets/emoji/player.svg";
import { useEffect, useState } from "react";
import { get } from "../service/FetchService";

const MatchPlayerCard = ({ turn, stoneColor }) => {
  useEffect(() => {
    getRoomInformation();
  }, []);

  const getRoomInformation = async () => {
    const response = await get(
      "/moku/" + localStorage.getItem("roomId") + "/details"
    );
    console.log(response);
  };

  const [timer, setTimer] = useState(20);
  useEffect(() => {
    if (!turn) return;
    setTimer(20);

    const timerAction = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerAction);
  }, [turn]);

  return (
    <div className="matchPlayerCard">
      <div className={`turnWrapper`}>
        <Stone variant={stoneColor} />
        <div className={`${turn ? "matchTurn" : ""}`}>{timer}s</div>
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
