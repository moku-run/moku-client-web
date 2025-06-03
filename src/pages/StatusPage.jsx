import { useState } from "react";
import "../styles/StatusPage.css";
import LeftContainer from "../components/LeftContainer";
import StatusContainer from "../containers/StatusContainer";

const StatusPage = () => {
  return (
    <div className="contentContainer">
      <LeftContainer />

      <div className="rightContent">
        <StatusContainer />
      </div>
    </div>
  );
};

export default StatusPage;
