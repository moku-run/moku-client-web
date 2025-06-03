import "../styles/LoginContainer.css";
import Button from "./Button";
import UnderBarLink from "./UnderBarLink";
import UnderBarInput from "./UnderBarInput";

const LoginContainer = ({ link }) => {
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
            title="아이디"
            placeHolder="아이디를 입력해주세요."
            variant="PRIMARY_INPUT"
          />
          <UnderBarInput
            title="비밀번호"
            placeHolder="비밀번호를 입력해주세요."
            variant="PRIMARY_INPUT"
          />
        </div>
        <div className="buttonWrapper">
          <Button name="로그인" variant="PRIMARY_BUTTON" />
          <Button name="로그인없이 시작하기" variant="DARK_BUTTON" />
          <UnderBarLink
            title="회원가입을 하면 전적을 관리할 수 있어요."
            variant="PRIMARY_LINK"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
