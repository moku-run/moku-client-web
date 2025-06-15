import "../styles/Stone.css";

const Stone = ({ variant, last }) => {
  return (
    <div className={`stone ${variant}`}>
      <div className={`${last ? "current" : ""}`}></div>
    </div>
  );
};

export default Stone;
