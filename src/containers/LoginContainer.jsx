import "../styles/LoginContainer.css";
import Button from "../components/Button";
import UnderBarLink from "../components/UnderBarLink";
import UnderBarInput from "../components/UnderBarInput";
import { useEffect, useState } from "react";
import SignUpContainer from "./SignUpContainer";
import { get, post } from "../service/FetchService";
import { useUserStore } from "../hooks/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginContainer = ({ matchSubmit, link, loginSubmit }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const result = await get("/users/details");

      if (result.success) {
        const nickname = result.data.payload.nickname;
        const loginId = result.data.payload.login_id;
        setUser({ nickname, login_id: loginId });

        navigate("/stats");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
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

  const loginSubmit2 = async () => {
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
      fetchUserDetails();
      toast.success("로그인에 성공했습니다.");
    }
  };

  const { setUser } = useUserStore();

  if (loading) return null;
  return (
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
            submit={loginSubmit2}
          />
          <UnderBarInput
            name="password"
            type="password"
            title="비밀번호"
            placeHolder="비밀번호를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={onChange}
            submit={loginSubmit2}
          />
        </div>
        <div className="buttonWrapper">
          <Button name="로그인" variant="PRIMARY_BUTTON" event={loginSubmit2} />
          <Button
            event={matchSubmit}
            name="로그인없이 시작하기"
            variant="DARK_BUTTON"
          />
          <UnderBarLink
            link={link}
            title="회원가입을 하면 전적을 관리할 수 있어요."
            variant="PRIMARY_LINK"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
