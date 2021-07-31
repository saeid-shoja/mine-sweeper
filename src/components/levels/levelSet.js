import React from "react";

function LevelSet(props) {
  return (
    <div className="level">
      <button className="button" onClick={props.esy}>
        Easy
      </button>
      <button className="button" onClick={props.nrml}>
        Normal
      </button>
      <button className="button" onClick={props.hrd}>
        Hard
      </button>
    </div>
  );
}

export default LevelSet;
