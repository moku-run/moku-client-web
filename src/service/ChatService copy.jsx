import { Client } from "@stomp/stompjs";
import { useEffect, useReducer, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { HTTP_API } from "./Api";

const ChatService = () => {
  const client = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // STOMP 클라이언트 생성
    client.current = new Client({
      webSocketFactory: () => new SockJS(`${HTTP_API}/ws`), // 서버의 WebSocket 엔드포인트
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재연결 간격 (ms)
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
  }, []);

  const sendMessage = () => {
    if (client.current && client.current.connected) {
      const message = {
        // sender: "user1",
        content: "Hello, STOMP!",
      };
      client.current.publish({
        destination: "/topic/reply",
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <div>
      <h2>채팅 메시지</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.sender}: {msg.content}
          </li>
        ))}
      </ul>
      <button onClick={sendMessage}>메시지 전송</button>
    </div>
  );
};

export default ChatService;
