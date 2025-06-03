import "../styles/Button.css";

const Button = ({ name, variant, event }) => {
  return (
    <button
      onClick={() => {
        event();
      }}
      className={`button ${variant}`}
    >
      {name}
    </button>
  );
};

export default Button;
