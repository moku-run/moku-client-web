import "../styles/CircleButton.css";
import { useUserStore } from "../hooks/userStore";

import cancleLogo from "./../assets/emoji/cancle.svg";

const CircleButton = ({ event }) => {
  const client = useUserStore((state) => state.client);
  const setClient = useUserStore((state) => state.setClient);

  return (
    <button
      onClick={() => {
        event();
        localStorage.removeItem("roomId");
        localStorage.removeItem("id");
        localStorage.removeItem("stone");
        setClient(null);
        client.deactivate(() => {
          console.log("종료");
        });
      }}
      className="circleButton"
    >
      <img src={cancleLogo} />
    </button>
  );
};

export default CircleButton;
