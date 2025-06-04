import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { HTTP_API, PLAY_CHANNEL, CHAT_CHANNEL } from "./service/Api";
import { useRef } from "react";

function OnClient() {
  const client = useRef(null);
}

export const createClient = new Client({
  webSocketFactory: () => new SockJS(`${HTTP_API}/ws`),
  debug: (str) => console.log(str),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  onConnect: () => {
    connect();
  },
});

export const connect = {};

export const publish = {};

export const subscribe = {};
