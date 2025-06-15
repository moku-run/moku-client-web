import "../styles/LoginContainer.css";

import Button from "../components/Button";
import UnderBarLink from "../components/UnderBarLink";
import UnderBarInput from "../components/UnderBarInput";
import { useEffect, useState } from "react";
import { post } from "../service/FetchService";
import { useUserStore } from "../hooks/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fetchUserDetailsService } from "./service/fetchUserDetailsService";
import { loadingGuardService } from "./service/loadingGuardService";
import { useMatchingContainerStore } from "./store/useMatchingContainerStore";

const LoginContainer = () => {
  const { open } = useMatchingContainerStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    fetchUserDetailsService({ setUser, navigate, setLoading });
  }, []);

  const [loginDTO, setLoginDTO] = useState({
    login_id: "",
    password: "",
  });

  const onChange = (name, value) => {
    setLoginDTO((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginSubmit = async () => {
    if (loginDTO.login_id === "") {
      toast.error("아이디는 필수입니다.");
      return;
    }

    if (loginDTO.password === "") {
      toast.error("비밀번호는 필수입니다.");
      return;
    }

    const result = await post("/login", loginDTO);

    if (result.success) {
      fetchUserDetailsService(setUser, navigate, setLoading);
      toast.success("로그인에 성공했습니다.");
      navigate("/stats");
    }
  };

  return loadingGuardService(
    loading,
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="titleWrapper">
          <h1>Login</h1>
          <p>오목 한 판 어때?!</p>
          <p>온라인에서 오목을 즐겨봐요!</p>
        </div>
        <div className="inputWrapper">
          <UnderBarInput
            name="login_id"
            title="아이디"
            placeHolder="아이디를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={onChange}
            submit={loginSubmit}
          />
          <UnderBarInput
            name="password"
            type="password"
            title="비밀번호"
            placeHolder="비밀번호를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={onChange}
            submit={loginSubmit}
          />
        </div>
        <div className="buttonWrapper">
          <Button name="로그인" variant="PRIMARY_BUTTON" event={loginSubmit} />
          <Button
            event={() => {
              open();
            }}
            name="로그인없이 시작하기"
            variant="DARK_BUTTON"
          />
          <UnderBarLink
            link={() => {
              navigate("/sign-up");
            }}
            title="회원가입을 하면 전적을 관리할 수 있어요."
            variant="PRIMARY_LINK"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
