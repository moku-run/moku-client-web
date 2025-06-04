import "../styles/PlayBoardContainer.css";
import Stone from "../components/Stone";
import { useEffect, useRef, useState } from "react";
import "../styles/MatchingContainer.css";
import { useUserStore } from "../hooks/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlayBoardContainer = () => {
  const client = useUserStore((state) => state.client);
  const setClient = useUserStore((state) => state.setClient);

  const [resultFlag, setResultFlag] = useState(false);
  const resultRef = useRef(false);

  const [moku, setMoku] = useState(
    Array(15)
      .fill()
      .map(() => Array(15).fill(null))
  );

  useEffect(() => {
    const roomId = localStorage.getItem("roomId");

    if (!roomId) {
      setClient(null);
      client.deactivate(() => {});

      toast.warn("종료된 방입니다.");
      window.location.href = "/";
    }

    const subscription = client.subscribe(`/topic/room.${roomId}`, (msg) => {
      const chat = JSON.parse(msg.body);
      if (chat.type !== "PLAY") {
        return;
      }

      const response = JSON.parse(chat.content);

      setMoku(response.board);
      // if (response.result === "VICTORY") {
      //   resultRef.current = true;
      // }
      if (response.result === "VICTORY") {
        setTimeout(() => {
          const id = localStorage.getItem("id");

          if (response.player === id) {
            toast.success("승리했습니다.");
          } else {
            toast.error("패배했습니다.");
          }

          client.deactivate(() => {});

          localStorage.removeItem("roomId");
          localStorage.removeItem("id");
          localStorage.removeItem("stone");

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }, 300);
      }
    });

    const errorSubscription = client.subscribe(
      "/user/queue/errors",
      (message) => {
        const msg = JSON.parse(message.body);
        toast.warn(msg.message);
      }
    );

    return () => {
      subscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [client]);

  // useEffect(() => {
  //   console.log("???");
  //   if (resultRef.current) {
  //     console.log("종료!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //     resultRef.current = false;
  //   }
  // }, []);

  useEffect(() => {}, [moku]);

  const onClickMoku = (row, col) => {
    if (moku[row][col] !== null) return;

    client.publish({
      destination: `/app/room.${localStorage.getItem("roomId")}`,
      body: JSON.stringify({
        type: `PLAY`,
        content: `${row},${col}`,
      }),
    });
  };

  return (
    <div className="PlayBoardContainer">
      <div className="playBoardWrapper">
        <div className="playBoardBack">
          {Array.from({ length: 15 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => (
              <div className="playBoardBack_cell" key={`${row}-${col}`}>
                <div
                  onClick={() => {
                    onClickMoku(row, col);
                  }}
                  key={`${row}-${col}`}
                  className={
                    moku[row][col] === null ? "playBoardBack_cell_point" : ""
                  }
                >
                  {moku[row][col] && <Stone variant={moku[row][col]} />}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="playBoardFront">
          {Array.from({ length: 14 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <div className="playBoardFront_cell" key={`${row}-${col}`}></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayBoardContainer;
