import { useEffect, useState } from "react";
import MatchPlayerCard from "../components/MatchPlayerCard";
import { useUserStore } from "../hooks/userStore";
import "../styles/MatchUpContainer.css";
import { fetchUserDetailsService } from "./service/fetchUserDetailsService";
import { toast } from "react-toastify";

const MatchUpContainer = () => {
  const [currentStone, setCurrentStone] = useState("BLAKC_STONE");
  const client = useUserStore((state) => state.client);
  const setClient = useUserStore((state) => state.setClient);

  useEffect(() => {
    const roomId = localStorage.getItem("roomId");
    if (!roomId) {
      setClient(null);
      client.deactivate(() => {});
    }

    const subscription = client.subscribe(`/topic/room.${roomId}`, (msg) => {
      const message = JSON.parse(msg.body);
      if (message.type !== "PLAY") {
        return;
      }
      const response = JSON.parse(message.content);
      setCurrentStone(response.current_stone);
    });

    return () => subscription.unsubscribe();
  }, [client, currentStone]);

  return (
    <div className="matchUpContainer">
      <MatchPlayerCard
        turn={currentStone === "BLACK_STONE"}
        stoneColor="BLACK_STONE"
      />
      <MatchPlayerCard
        turn={currentStone === "WHITE_STONE"}
        stoneColor="WHITE_STONE"
      />
    </div>
  );
};

export default MatchUpContainer;
