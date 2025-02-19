// Board_1.js 는 기본기능완성 (history state 사용전)
import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = () => {
  //State를 useState Hook을 이용해서 표현 [getter, setter]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  //승자확인
  const calculateWinner = (squares) => {
    //빙고되는 모든 경우의 수 나열
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  //본문 내 승자 표기
  let status;
  if (winner) {
    status = "winner" + winner;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newSquares = squares.slice(); //배열복사
    //calculateWinner(newSquares) : 승자가 있거나
    // newSquares[i] : x나 o가 있다면 return;
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    // setXIsNext(!xIsNext) =>"이거랑 똑같음" setXIsNext((previousState) => !previousState)
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  // 함수형에서는 render() 없이 바로 return()
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
