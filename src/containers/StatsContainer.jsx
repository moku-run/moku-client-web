import "../styles/StatsContainer.css";

import Button from "../components/Button";
import CustomActiveShapePieChart from "../components/CustomActiveShapePieChart";
import { useEffect, useState } from "react";
import { get, post } from "../service/FetchService";
import { useUserStore } from "../hooks/userStore";
import { useNavigate } from "react-router-dom";

import { loadingGuardService } from "./service/loadingGuardService";
import { useMatchingContainerStore } from "./store/useMatchingContainerStore";

const StatsContainer = () => {
  const { open } = useMatchingContainerStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [records, setRecords] = useState(null);
  const { nickname, loginId } = useUserStore();

  const submitLogout = async () => {
    const response = await post("/logout");

    navigate("/");
  };

  const getRecords = async () => {
    const response = await get("/stats");
    if (!response.success) {
      navigate("/");
    }

    setRecords(response.data.payload);
    setLoading(false);
  };

  useEffect(() => {
    getRecords();
  }, []);

  return loadingGuardService(
    loading,
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
          event={() => {
            open();
          }}
          variant={"PRIMARY_BUTTON"}
        />
        <Button name="로그아웃" event={submitLogout} variant={"DARK_BUTTON"} />
      </div>
    </div>
  );
};

export default StatsContainer;
