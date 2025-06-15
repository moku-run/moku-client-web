import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "react-toastify";
import { HTTP_API } from "../../service/Api";

export const matchingService = (client, setClient, navigate, close) => {
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
          toast.dark("흑돌입니다! 선공하세요!");
        }

        if (matchingResult.stone === "WHITE_STONE") {
          toast.info("백돌입니다! 후공입니다!");
        }

        setTimeout(() => {
          close();
          navigate("/play-moku");
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
