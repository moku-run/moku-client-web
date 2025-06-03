import { Client } from "@stomp/stompjs";
import { useEffect, useReducer, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { HTTP_API, PLAY_CHANNEL } from "./Api";

export const ChatService = () => {
  const client = useRef(null);
  const [connected, setConnected] = useState(null);
  const [messages, setMessages] = useState([]);

  const onConnect = () => {
    if (client.current) return;

    client.current = new Client({
      webSocketFactory: () => new SockJS(`${HTTP_API}/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        alert("소켓 연결 성공 !!!!!!!!!!");
        setConnected(true);

        client.current.subsribe(`${PLAY_CHANNEL}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"], frame.body);
      },
    });
  };

  client.current.activate();
};
