import "../styles/UnderBarInput.css";
import { useState } from "react";

const UnderBarInput = ({
  name,
  type = "text",
  title,
  placeHolder,
  variant,
  outline = "none",
  event,
  submit,
}) => {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    event(name, e.target.value);
  };

  const onSubmitEnter = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="underBarInputWrapper">
      <div className="underBarInputTitle">{title}</div>
      <input
        type={type}
        className={`underBarInput ${variant} ${outline}`}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyDown={onSubmitEnter}
      />
    </div>
  );
};

export default UnderBarInput;
