import React from "react";
import "./Square.css";

const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

/**
 this.props.onClick() 대신 
 변수 () 안에 props 넣고 props.onClick() 만 쓰기 
 또는, 변수에 원하는 조건변수 넣고 this.props 전부 날리기 
 */

export default Square;
