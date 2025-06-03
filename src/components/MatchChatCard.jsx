import "../styles/MatchChatCard.css";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../hooks/userStore";

const chatDTO = {
  textType: "MESSAGE",
  message: "hihi",
};

const textDTOList = [
  {
    message: "hihi",
    type: "SEND",
  },
];

const MatchChatCard = () => {
  const client = useUserStore((state) => state.client);
  const [inputChat, setInputChat] = useState("");
  const [textDTOList, setTextDTOList] = useState([]);

  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    client.subscribe(`/topic/room.${localStorage.getItem("roomId")}`, (msg) => {
      const chat = JSON.parse(msg.body);
      if (chat.type !== "CHAT") {
        return;
      }

      setTextDTOList((prev) => [
        ...prev,
        {
          message: chat.content,
          type: chat.id === localStorage.getItem("id") ? "SEND" : "RECEIVE",
        },
      ]);
    });
  }, [client]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [textDTOList]);

  const onSendMessage = () => {
    client.publish({
      destination: `/app/room.${localStorage.getItem("roomId")}`,
      body: JSON.stringify({
        type: `CHAT`,
        content: `${inputChat}`,
      }),
    });

    setInputChat("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (inputChat.trim() !== "") {
        onSendMessage();
        setInputChat("");
      }
    }
  };

  return (
    <div className="matchChatCard">
      <div className="messageWrapper">
        <div className="messageBox">
          {textDTOList.map((e) => (
            <ChatBubble key={e.id} message={e.message} type={e.type} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="messageInput">
        <textarea
          value={inputChat}
          placeholder="Message"
          className="messageArea"
          onChange={(e) => setInputChat(e.target.value)}
          onKeyDown={onKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </div>
    </div>
  );
};

export default MatchChatCard;
