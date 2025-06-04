import "../styles/SignUpContainer.css";

import Button from "../components/Button";
import UnderBarLink from "../components/UnderBarLink";
import UnderBarInput from "../components/UnderBarInput";
import { useState } from "react";
import { post } from "../service/FetchService";
import { toast } from "react-toastify";

const SignUpDTO = {
  loginId: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const SignUpContainer = ({ matchSubmit, link }) => {
  const [signUpDTO, setSignUpDTO] = useState({
    loginId: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (name, value) => {
    setSignUpDTO((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(`${name} ${value}`);
  };

  return (
    <div className="signUpContainer">
      <div className="signUpWrapper">
        <div className="titleWrapper">
          <h1>회원가입</h1>
          <p>최소 정보만 입력하면 전적을 관리할 수 있어요!</p>
        </div>
        <div className="inputWrapper">
          <UnderBarInput
            name="loginId"
            title="아이디"
            placeHolder="로그인 아이디를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
          />
          <UnderBarInput
            name="password"
            type="password"
            title="비밀번호"
            placeHolder="비밀번호를 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
          />
          <UnderBarInput
            name="passwordConfirm"
            type="password"
            title="비밀번호 재확인"
            placeHolder="비밀번호를 한 번 더 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
          />
          <UnderBarInput
            name="nickname"
            title="닉네임"
            placeHolder="닉네임을 입력해주세요."
            variant="PRIMARY_INPUT"
            event={handleChange}
          />
        </div>
        <div className="buttonWrapper">
          <Button
            name="회원가입 하기"
            variant="PRIMARY_BUTTON"
            event={async () => {
              const result = await post("/users", signUpDTO);
              console.log(`result: ${result.success}`);
              if (result.success) {
                toast.success("회원가입을 축하드립니다!\n바로 로그인하세요!");
                link();
              }
            }}
          />
          <Button
            event={matchSubmit}
            name="로그인없이 시작하기"
            variant="DARK_BUTTON"
          />
          <UnderBarLink
            link={link}
            title="이미 회원이신가요? 바로 로그인하세요 !"
            variant="SECONDARY_LINK"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
