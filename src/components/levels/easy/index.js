import React, { useState } from "react";
import "../levelStyles.css";
import { Lose } from "../../finishTheGame/Finish";
import { Win } from "../../finishTheGame/Finish";
import { EASY_ARRAY } from "../../../Constant/ArrConst";

const EasyBoxs = (props) => {
  const [gameState, setGameState] = useState("playing");
  const [items, setItems] = useState(
    Array(64)
      .fill()
      .map((_, idx) => (idx = { bomb: 0, open: 0, flag: 0 }))
  );

  const arr = EASY_ARRAY;
  const bombChecker = (idx) => {
    let result = 0;
    let right = [7, 15, 23, 31, 39, 47, 55, 63];
    let left = [0, 8, 16, 24, 32, 40, 48, 56];
    let top = [0, 1, 2, 3, 4, 5, 6, 7];
    let bottom = [56, 57, 58, 59, 60, 61, 62, 63];
    let rightT = [7, 15, 23, 31, 39, 47, 55];
    let leftT = [0, 8, 16, 24, 32, 40, 48];
    let leftB = [8, 16, 24, 32, 40, 48, 56];
    let topR = [1, 2, 3, 4, 5, 6, 7];

    if (arr.indexOf(idx + 1) > -1 && !right.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 1) > -1 && !left.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 8) > -1 && !topR.includes(idx)) {
      result++;
    }
    if (
      arr.indexOf(idx - 7) > -1 &&
      !top.includes(idx) &&
      !right.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx - 9) > -1 &&
      !top.includes(idx) &&
      !leftB.includes(idx)
    ) {
      result++;
    }
    if (arr.indexOf(idx + 8) > -1 && !bottom.includes(idx)) {
      result++;
    }
    if (
      arr.indexOf(idx + 7) > -1 &&
      !bottom.includes(idx) &&
      !leftT.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx + 9) > -1 &&
      !bottom.includes(idx) &&
      !rightT.includes(idx)
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
      }
      if (
        result === 0 &&
        !bottom.includes(idx) &&
        !left.includes(idx) &&
        items[idx + 7].open === 0
      ) {
        items[idx + 7].open++;
      }
      if (
        result === 0 &&
        !right.includes(idx) &&
        !top.includes(idx) &&
        items[idx - 7].open === 0
      ) {
        items[idx - 7].open++;
      }
      if (result === 0 && !bottom.includes(idx) && items[idx + 8].open === 0) {
        items[idx + 8].open++;
      }
      if (result === 0 && !top.includes(idx) && items[idx - 8].open === 0) {
        items[idx - 8].open++;
      }
      if (
        result === 0 &&
        !bottom.includes(idx) &&
        !right.includes(idx) &&
        items[idx + 9].open === 0
      ) {
        items[idx + 9].open++;
      }

      if (
        result === 0 &&
        !top.includes(idx) &&
        !left.includes(idx) &&
        items[idx - 9].open === 0
      ) {
        items[idx - 9].open++;
      }
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
      const isBomb = arr.includes(i);
      const isOpen = newItems[i].open;

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
      return "easyBomb";
    }
    if (item.open >= 1) {
      return "easyOpen";
    }
    if (item.flag >= 1) {
      return "easyFlag";
    }
    return "easyItems";
  };

  return (
    <div>
      <div className="easyBoxes">
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
      </div>
      {renderGameState()}
    </div>
  );
};

export default EasyBoxs;
