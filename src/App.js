import "./App.css";
import Board from "./components/Board";
import { useState } from "react";

function App() {
  //history state는 board/info 두 영역에 사용되기때문에 Board.js에 있는 값들을 App.js로 옮겨줌
  //history 컴포넌트는 배열로 되어있음 + squares 는 null 로 채워줘
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  //현재 몇 번째 스텝인지 알 수 있는 state 생성
  const [stepNumber, setStepNumber] = useState(0);

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

  //history배열에 마지막 index의 값을 가져옴
  //const current = history[history.length - 1];
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  //본문 내 승자 표기
  let status;
  if (winner) {
    status = "winner" + winner;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  //클릭이벤트
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    //calculateWinner(newSquares) : 승자가 있거나
    // newSquares[i] : x나 o가 있다면 return;
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  //리스트생성 : step은 moves클릭시마다 빙고판의 null 대신 x또는 o가 들어간 배열(Array9)
  const moves = history.map((step, index) => {
    const desc = index ? "Go to move #" + index : "Go to game start";
    return (
      <li key={index}>
        <button className="move-btn" onClick={() => jumpTo(index)}>
          {desc}
        </button>
      </li>
    );
  });
  //회귀버튼
  const jumpTo = (step) => {
    setStepNumber(step); //그 당시의 history state로 돌아가기
    setXIsNext(step % 2 === 0); //짝수일때마다 TRUE
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
