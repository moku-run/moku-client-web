import "../styles/SignUpContainer.css";

import Button from "../components/Button";
import UnderBarLink from "../components/UnderBarLink";
import UnderBarInput from "../components/UnderBarInput";
import { useEffect, useState } from "react";
import { post } from "../service/FetchService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/userStore";

import { loadingGuardService } from "./service/loadingGuardService";
import { fetchUserDetailsService } from "./service/fetchUserDetailsService";
import { useMatchingContainerStore } from "./store/useMatchingContainerStore";

const SignUpDTO = {
  login_id: "",
  nickname: "",
  password: "",
  password_confirm: "",
};

const SignUpContainer = () => {
  const { open } = useMatchingContainerStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    fetchUserDetailsService({ setUser, navigate, setLoading });
  }, []);
  const [signUpDTO, setSignUpDTO] = useState({
    login_id: "",
    nickname: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (name, value) => {
    setSignUpDTO((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpSubmit = async () => {
    const result = await post("/users/sign-up", signUpDTO);

    if (result.success) {
      toast.success("회원가입을 축하드립니다!\n바로 로그인하세요!");
      navigate("/");
    }
  };

  return loadingGuardService(
    loading,
    <div className="signUpContainer">
      <div className="signUpWrapper">
        <div className="titleWrapper">
          <h1>회원가입</h1>
          <p>최소 정보만 입력하면 전적을 관리할 수 있어요!</p>
        </div>
        <div className="inputWrapper">
          <UnderBarInput
            name="login_id"
            title="아이디"
            placeHolder="로그인 아이디를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
            submit={signUpSubmit}
          />
          <UnderBarInput
            name="password"
            type="password"
            title="비밀번호"
            placeHolder="비밀번호를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
            submit={signUpSubmit}
          />
          <UnderBarInput
            name="password_confirm"
            type="password"
            title="비밀번호 재확인"
            placeHolder="비밀번호를 한 번 더 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
            submit={signUpSubmit}
          />
          <UnderBarInput
            name="nickname"
            title="닉네임"
            placeHolder="닉네임을 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
            submit={signUpSubmit}
          />
        </div>
        <div className="buttonWrapper">
          <Button
            name="회원가입 하기"
            variant="PRIMARY_BUTTON"
            event={signUpSubmit}
          />
          <Button
            event={() => {
              open();
            }}
            name="로그인없이 시작하기"
            variant="DARK_BUTTON"
          />
          <UnderBarLink
            link={() => {
              navigate("/");
            }}
            title="이미 회원이신가요? 바로 로그인하세요 !"
            variant="SECONDARY_LINK"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
