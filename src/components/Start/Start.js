import React from "react";
import "./Start.css";

const Start = (props) => {
  return (
    <div className="start">
      <div>
        <button className="startBtn" onClick={props.start}>
          Start
        </button>
        <button className="resetBtn" onClick={props.reset}>
          Reset
        </button>
      </div>
      <div className="numbers">
        <h2 className="timer">timer: {props.timer}</h2>
        <h2 className="bombNumber">Bombs: {props.bombNumber}</h2>
      </div>
    </div>
  );
};

export default Start;
