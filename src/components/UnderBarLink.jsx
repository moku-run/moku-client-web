import "../styles/UnderBarLink.css";

const UnderBarLink = ({ link, title, variant }) => {
  return (
    <div className="underBarWrapper">
      <button
        onClick={() => {
          link();
        }}
        className={`underBarLink ${variant}`}
      >
        {title}
      </button>
    </div>
  );
};

export default UnderBarLink;
