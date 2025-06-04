import { useState } from "react";
import "./App.css";
import ContentContainer from "./components/ContentContainer";
import MatchingContainer from "./containers/MatchingContainer";
import MokuPage from "./pages/MokuPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MATCH_STATE = {
  READY: "READY",
  PLAY: "PLAY",
};

const MATCH_JOIN = {
  NONE: "NONE",
  READY: "READY",
};

function App() {
  const [matching, setMatching] = useState(MATCH_STATE.READY);
  const [join, setJoin] = useState(MATCH_JOIN.NONE);

  const cancelMatchJoin = () => {
    setJoin(MATCH_JOIN.NONE);
  };

  const matchJoin = () => {
    setJoin(MATCH_JOIN.READY);
  };

  const updateJoin = (result) => {
    setJoin(result ? MATCH_JOIN.NONE : MATCH_JOIN.READY);
  };

  const updateMatching = (result) => {
    setMatching(result ? MATCH_STATE.PLAY : MATCH_STATE.READY);
  };

  return (
    <div className="App">
      {matching === `${MATCH_STATE.READY}` ? (
        <ContentContainer matchSubmit={matchJoin} />
      ) : (
        <MokuPage />
      )}

      {join === `${MATCH_JOIN.READY}` ? (
        <MatchingContainer
          cancle={cancelMatchJoin}
          setJoin={updateJoin}
          setMatching={updateMatching}
        />
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default App;
