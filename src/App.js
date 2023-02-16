import { useState } from "react";
const Square = ({ value, squareClicked }) => {
  return (
    <button className="square" onClick={squareClicked}>
      {value}
    </button>
  );
};

export default function Board() {
  const [isXnext, setIsXnext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquare = squares.slice();
    if (isXnext) nextSquare[i] = "X";
    else nextSquare[i] = "O";

    setSquares(nextSquare);
    setIsXnext(!isXnext);
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner : " + winner;
  } else {
    status = "Next turn : " + (isXnext ? "X" : "O");
  }
  return (
    <>
      <div className="status"> {status}</div>

      <div className="board-row">
        <Square value={squares[0]} squareClicked={() => handleClick(0)} />
        <Square value={squares[1]} squareClicked={() => handleClick(1)} />
        <Square value={squares[2]} squareClicked={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} squareClicked={() => handleClick(3)} />
        <Square value={squares[4]} squareClicked={() => handleClick(4)} />
        <Square value={squares[5]} squareClicked={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} squareClicked={() => handleClick(6)} />
        <Square value={squares[7]} squareClicked={() => handleClick(7)} />
        <Square value={squares[8]} squareClicked={() => handleClick(8)} />
      </div>
    </>
  );
}
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return squares[a];
  }
  return null;
};
