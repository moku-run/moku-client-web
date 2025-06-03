import "../styles/TestBoard.css";

export const TestBoard = () => {
  return (
    <div className="boardWrapper">
      <div className="boardGrid">
        {Array.from({ length: 15 }).map((_, row) =>
          Array.from({ length: 15 }).map((_, col) => (
            <div className="cell" key={`${row}-${col}`}></div>
          ))
        )}
      </div>
      <div className="xLabels">
        {"ABCDEFGHIJKLMNO".split("").map((char, i) => (
          <div className="label" key={i}>
            {char}
          </div>
        ))}
      </div>
      <div className="yLabels">
        {Array.from({ length: 15 }).map((_, i) => (
          <div className="label" key={i}>
            {15 - i}
          </div>
        ))}
      </div>
    </div>
  );
};
