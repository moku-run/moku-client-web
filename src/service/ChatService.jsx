import { Client } from "@stomp/stompjs";
import { useEffect, useReducer, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { HTTP_API } from "./Api";

export const useOnConnect = () => {
  const client = useRef(null);
  const [messages, setMessages] = useState([]);

  client.current = new Client({
    webSocketFactory: () => new SockJS(`${HTTP_API}/ws`), // 서버의 WebSocket 엔드포인트
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      // 연결 성공 시 구독 설정
      client.current.subscribe("/topic/reply", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
  });

  // 클라이언트 활성화
  client.current.activate();

  // 컴포넌트 언마운트 시 연결 해제
  return () => {
    if (client.current) {
      client.current.deactivate();
    }
  };
};
