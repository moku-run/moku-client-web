import "../styles/StatusContainer.css";

import Button from "../components/Button";
import CustomActiveShapePieChart from "../components/CustomActiveShapePieChart";
import { useEffect, useState } from "react";
import { get } from "../service/FetchService";
import { useUserStore } from "../hooks/userStore";

const StatusContainer = ({ matchSubmit, logoutSubmit }) => {
  const [records, setRecords] = useState(null);

  const { nickname, loginId } = useUserStore();

  useEffect(() => {
    const getRecords = async () => {
      const response = await get("/records");

      setRecords(response.data.payload);
    };
    getRecords();
  }, []);

  return (
    <div className="statusContainer">
      <div className="statusWrapper">
        <div className="titleWrapper">
          <h1>{nickname}</h1>
          <p>오목 한 판 어때?!</p>
          <p>온라인에서 오목을 즐겨봐요!</p>
        </div>
      </div>
      <div className="scoreWrapper">
        <div className="scoreGraph">
          {records && <CustomActiveShapePieChart data={records} />}
        </div>
        {records && (
          <div className="score">{`${records.total_count}전 ${records.win_count}승 ${records.lose_count}패`}</div>
        )}
      </div>
      <div className="buttonWrapper">
        <Button
          name="시작하기"
          event={matchSubmit}
          variant={"PRIMARY_BUTTON"}
        />
        <Button name="로그아웃" event={logoutSubmit} variant={"DARK_BUTTON"} />
      </div>
    </div>
  );
};

export default StatusContainer;
