import { useEffect, useRef, useState } from "react";
import CircleButton from "../components/CircleButton";
import "../styles/MatchingContainer.css";
import logo from "./../assets/logo/logo.png";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { HTTP_API } from "../service/Api";
import { useUserStore } from "../hooks/userStore";

const tips = [
  "[TIP] 3x3, 4x4는 허용되고 있어요.",
  "[TIP] 장목은 무효입니다! 6목 이상은 인정되지 않아요.",
  "[TIP] 선공은 흑돌입니다. 수 싸움에서 앞서 나가세요!",
  "[TIP] 3x3이나 4x4는 강력하지만, 금수에 주의하세요.",
  "[TIP] 5목이 완성되어야 승리합니다.",
  "[TIP] 가로, 세로, 대각선 모두 체크하세요.",
  "[TIP] 승리에 가까워질수록 침착하게!",
  "[TIP] 대각선 방향 공격도 놓치지 마세요!",
  "[TIP] 수비도 중요해요! 상대의 연결을 끊어보세요.",
];

const MatchingContainer = ({ cancle, setJoin, setMatching }) => {
  const [currentTip, setCurrentTip] = useState(
    tips[Math.floor(Math.random() * tips.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const client = useRef(null);
  const { setClient } = useUserStore.getState();

  const matchJoin = () => {
    if (client.current) return;

    client.current = new Client({
      webSocketFactory: () => new SockJS(`${HTTP_API}/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("⭐️ 소켓 연결 완료 ⭐️");

        client.current.subscribe("/user/queue/matched", (msg) => {
          const matchingResult = JSON.parse(msg.body);
          console.log(`msg.body: ${msg.body}`);

          localStorage.removeItem("roomId");
          localStorage.setItem("roomId", matchingResult.room_id);

          localStorage.removeItem("id");
          localStorage.setItem("id", matchingResult.id);

          localStorage.removeItem("stone");
          localStorage.setItem("stone", matchingResult.stone);

          if (matchingResult.stone === "BLACK_STONE") {
            alert("흑돌입니다! 선공하세요!");
          }

          if (matchingResult.stone === "WHITE_STONE") {
            alert("백돌입니다! 후공입니다!");
          }

          setTimeout(() => {
            setJoin(true);
            setMatching(true);
          }, 3000);
        });

        client.current.publish({
          destination: "/app/ready",
        });
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"], frame.body);
      },
    });

    client.current.activate();
    setClient(client.current);
  };

  useEffect(() => {
    matchJoin();
  }, []);

  return (
    <div className="matchingContainer">
      <div className="matchingWrapper">
        <div className="matchingLogo">
          <img src={logo} />
          <div className="cancleButton">
            <CircleButton event={cancle} />
          </div>
        </div>
        <div className="matchingContent">
          <p>...매칭 중입니다.</p>
          <h2>{currentTip}</h2>
        </div>
      </div>
    </div>
  );
};

export default MatchingContainer;
