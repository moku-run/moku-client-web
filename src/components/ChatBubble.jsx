import "../styles/ChatBubble.css";

const ChatBubble = ({ message, type = "RECEIVE" }) => {
  const wrapperType =
    type === "RECEIVE" ? "ChatBubbleWrapper_SEND" : "ChatBubbleWrapper_RECEIVE";

  return (
    <div className={`ChatBubbleWrapper ${wrapperType}`}>
      <div className={`ChatBubble ${type}`}>
        <div className="message" style={{ whiteSpace: "pre-line" }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
