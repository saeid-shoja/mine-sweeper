import React from "react";
import "./style.css";
import ReplayIcon from "@material-ui/icons/Replay";

const refresh = () => {
  window.location.reload();
};

export function Win(props) {
  return (
    <div className="winner">
      <h1>
        YOU WIN{" "}
        <ReplayIcon
          onClick={refresh}
          style={{ fontSize: 50, cursor: "pointer" }}
        />
      </h1>
      <h2 className="record-time">{props.timer} sec</h2>
    </div>
  );
}

export function Lose() {
  return (
    <div className="loser">
      <h1>
        YOU LOSE{" "}
        <ReplayIcon
          onClick={refresh}
          style={{ fontSize: 50, cursor: "pointer" }}
        />
      </h1>
    </div>
  );
}
