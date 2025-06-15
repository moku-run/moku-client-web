import { useEffect, useRef, useState } from "react";
import CircleButton from "../components/CircleButton";
import "../styles/MatchingContainer.css";
import logo from "./../assets/logo/logo.png";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { HTTP_API } from "../service/Api";
import { useUserStore } from "../hooks/userStore";
import { toast } from "react-toastify";

import { useMatchingContainerStore } from "./store/useMatchingContainerStore";
import { getRandomTip } from "./model/tipsModel";
import { matchingService } from "./service/matchingService";
import { useNavigate } from "react-router-dom";

const MatchingContainer = () => {
  const navigate = useNavigate();
  const { isOpen, open, close } = useMatchingContainerStore();
  const [currentTip, setCurrentTip] = useState(getRandomTip());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const client = useRef(null);
  const { setClient } = useUserStore.getState();

  useEffect(() => {
    if (isOpen) {
      matchingService(client, setClient, navigate, close);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="matchingContainer">
      <div className="matchingWrapper">
        <div className="matchingLogo">
          <img src={logo} />
          <div className="cancleButton">
            <CircleButton
              event={() => {
                close();
              }}
            />
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
