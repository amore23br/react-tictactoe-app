import React, { Component } from "react";
import "./Board.css";
import Square from "./Square";
/**
한 파일에서 여러개의 클래스를 가져오고 싶으면? 
Square 대신 {Square1, Square2} 이렇게 써줘야함 
대신 default 가 없어야 함
*/

// default는 이 클래스를 메인으로 지정 -> 밖으로 내보내준다는 의미
export default class Board extends Component {
  //초기설정 - state생성
  constructor(props) {
    //super 가 있어야 this를 사용할 수 있음
    super(props);
    this.state = {
      //value: null를 쓰면 모두 똑같은 null 값을 가지게 됨 -> 다 다르게 넣고싶으면 배열로 작성
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); //배열복사
    squares[i] = "X";
    this.setState({ squares: squares });
  }

  // <Square/>를 그대로 쓸수있지만 함수로 지정해서 사용할수도 있음
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    return (
      //jsx 는 부모요소로 감싸줘야함 + this 는 class 를 가르킴
      <div>
        <div className="status">Next Player: X, O</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
