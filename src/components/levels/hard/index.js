import React, { useState } from "react";
import "../levelStyles.css";
import { Lose } from "../../finishTheGame/Finish";
import { Win } from "../../finishTheGame/Finish";
import { HARD_ARRAY } from "../../../Constant/ArrConst";

const HardBoxs = (props) => {
  const [gameState, setGameState] = useState("playing");
  const [items, setItems] = useState(
    Array(480)
      .fill()
      .map((_, idx) => (idx = { bomb: 0, open: 0, flag: 0 }))
  );
  const arr = HARD_ARRAY;

  const bombChecker = (idx) => {
    let result = 0;
    let right = [
      29, 59, 89, 119, 149, 179, 209, 239, 269, 299, 329, 359, 389, 419, 449,
      479,
    ];
    let left = [
      0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450,
    ];
    let top = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ];
    let bottom = [
      450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464,
      465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479,
    ];
    let rightT = [
      29, 59, 89, 119, 149, 179, 209, 239, 269, 299, 329, 359, 389, 419, 449,
    ];
    let leftT = [
      0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420,
    ];
    let leftB = [
      30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450,
    ];
    let topR = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29,
    ];

    if (arr.indexOf(idx + 1) > -1 && !right.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 1) > -1 && !left.includes(idx)) {
      result++;
    }
    if (
      arr.indexOf(idx + 29) > -1 &&
      !bottom.includes(idx) &&
      !leftT.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx - 29) > -1 &&
      !top.includes(idx) &&
      !right.includes(idx)
    ) {
      result++;
    }

    if (arr.indexOf(idx + 30) > -1 && !bottom.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 30) > -1 && !topR.includes(idx)) {
      result++;
    }

    if (
      arr.indexOf(idx + 31) > -1 &&
      !bottom.includes(idx) &&
      !rightT.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx - 31) > -1 &&
      !top.includes(idx) &&
      !leftB.includes(idx)
    ) {
      result++;
    }
    if (result > 0) {
      return result;
    } else {
      if (result === 0 && !right.includes(idx) && items[idx + 1].open === 0) {
        items[idx + 1].open++;
      }
      if (result === 0 && !left.includes(idx) && items[idx - 1].open === 0) {
        items[idx - 1].open++;
        if (
          result === 0 &&
          !bottom.includes(idx) &&
          items[idx + 30].open === 0
        ) {
          items[idx + 30].open++;
        }
        if (result === 0 && !top.includes(idx) && items[idx - 30].open === 0) {
          items[idx - 30].open++;
        }
      }
      if (
        result === 0 &&
        !bottom.includes(idx) &&
        !leftT.includes(idx) &&
        items[idx + 29].open === 0
      ) {
        items[idx + 29].open++;
      }
      if (
        result === 0 &&
        !right.includes(idx) &&
        !top.includes(idx) &&
        items[idx - 29].open === 0
      ) {
        items[idx - 29].open++;
      }
      if (
        result === 0 &&
        !bottom.includes(idx) &&
        !right.includes(idx) &&
        items[idx + 31].open === 0
      ) {
        items[idx + 31].open++;
      }
      if (
        result === 0 &&
        !top.includes(idx) &&
        !left.includes(idx) &&
        items[idx - 31].open === 0
      ) {
        items[idx - 31].open++;
      }
    }
  };

  const clickHandler = (idx) => {
    if (props.timer === 0) {
      props.start();
    }
    const newItems = [...items];
    let coppiedItem = { ...newItems[idx] };
    if (coppiedItem.open === 0) coppiedItem.open++;
    if (arr.indexOf(idx) > -1 && coppiedItem.bomb === 0) {
      coppiedItem.bomb++;
    } else {
    }
    newItems[idx] = coppiedItem;
    setItems(newItems);

    let canContinue = false;
    for (let i = 0; i < newItems.length; i++) {
      const isOpen = newItems[i].open;
      const isBomb = arr.includes(i);
      if (isBomb && isOpen) {
        setGameState("lose");
        clearInterval(props.status);
        return;
      }
      if (!isOpen && !isBomb) {
        canContinue = true;
      }
    }
    if (!canContinue) {
      setGameState("win");
      clearInterval(props.status);
    }
  };

  const setFlag = (e, item) => {
    e.preventDefault();
    if (item.flag === 0) {
      item.flag++;
    } else if (item.flag > 0) {
      item.flag--;
    }
  };
  const renderGameState = () => {
    switch (gameState) {
      case "lose":
        return <Lose />;
      case "win":
        return <Win timer={props.timer} />;
      default:
        return null;
    }
  };

  const styleToggle = (item) => {
    if (item.bomb >= 1) {
      clearInterval(props.status);
      return "hardBomb";
    }
    if (item.open >= 1) {
      return "hardOpen";
    }
    if (item.flag >= 1) {
      return "hardFlag";
    }
    return "hardItems";
  };

  return (
    <div className="hardBoxes">
      {items.map((item, idx) => {
        return (
          <span
            className={styleToggle(item)}
            key={idx}
            onClick={() => clickHandler(idx)}
            onContextMenu={(e) => setFlag(e, item)}
          >
            {item.open > 0 && !item.bomb > 0 ? bombChecker(idx) : ""}
          </span>
        );
      })}
      {renderGameState()}
    </div>
  );
};

export default HardBoxs;
