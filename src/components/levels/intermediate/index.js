import React, { useState } from "react";
import "../levelStyles.css";
import { Lose } from "../../finishTheGame/Finish";
import { Win } from "../../finishTheGame/Finish";
import { NORMAL_ARRAY } from "../../../Constant/ArrConst";


const NormalBoxs = (props) => {
  const [gameState, setGameState] = useState("playing");
  const [items, setItems] = useState(
    Array(256)
      .fill()
      .map((_, idx) => (idx = { bomb: 0, open: 0, flag: 0 }))
  );
  const arr = NORMAL_ARRAY;
  const bombChecker = (idx) => {
    let result = 0;
    let right = [
      15, 31, 47, 63, 89, 105, 121, 137, 153, 169, 185, 201, 217, 233, 249, 265,
    ];
    let left = [
      0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240,
    ];
    let top = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let bottom = [
      240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254,
      255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265,
    ];
    let rightT = [
      15, 31, 47, 63, 89, 105, 121, 137, 153, 169, 185, 201, 217, 233, 249,
    ];
    let leftT = [
      0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224,
    ];
    let leftB = [
      16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240,
    ];
    let rightB = [
      31, 47, 63, 89, 105, 121, 137, 153, 169, 185, 201, 217, 233, 249, 265,
    ];

    if (arr.indexOf(idx + 1) > -1 && !right.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 1) > -1 && !left.includes(idx)) {
      result++;
    }
    if (
      arr.indexOf(idx + 15) > -1 &&
      !bottom.includes(idx) &&
      !leftT.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx - 15) > -1 &&
      !top.includes(idx) &&
      !rightB.includes(idx)
    ) {
      result++;
    }

    if (arr.indexOf(idx + 16) > -1 && !bottom.includes(idx)) {
      result++;
    }
    if (arr.indexOf(idx - 16) > -1 && !top.includes(idx)) {
      result++;
    }

    if (
      arr.indexOf(idx + 17) > -1 &&
      !bottom.includes(idx) &&
      !rightT.includes(idx)
    ) {
      result++;
    }
    if (
      arr.indexOf(idx - 17) > -1 &&
      !top.includes(idx) &&
      !leftB.includes(idx)
    ) {
      result++;
    }
    if (result > 0) {
      return result;
    } else {
      if (result === 0 && !right.includes(idx)) {
        items[idx + 1].open++;
      }
      if (result === 0 && !left.includes(idx)) {
        items[idx - 1].open++;
      }
      if (result === 0 && !bottom.includes(idx) && !leftT.includes(idx)) {
        items[idx + 15].open++;
      }
      if (result === 0 && !rightB.includes(idx) && !top.includes(idx)) {
        items[idx - 15].open++;
      }
      if (result === 0 && !bottom.includes(idx)) {
        items[idx + 16].open++;
      }
      if (result === 0 && !top.includes(idx)) {
        items[idx - 16].open++;
      }
      if (result === 0 && !bottom.includes(idx) && !rightT.includes(idx)) {
        items[idx + 17].open++;
      }
      if (result === 0 && !top.includes(idx) && !leftB.includes(idx)) {
        items[idx - 17].open++;
      }
    }
  };

  const clickHandler = (idx) => {
    if (props.timer === 0) {
      props.start();
    }
    const newClicks = [...items];
    let newItems = { ...newClicks[idx] };
    newItems.open++;
    if (arr.indexOf(idx) > -1) {
      newItems.bomb++;
    } else {
    }
    newClicks[idx] = newItems;
    setItems(newClicks);
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
    item.flag++;
  };

  const styleToggle = (item) => {
    if (item.bomb >= 1) {
      return "normalBomb";
    }
    if (item.open >= 1) {
      return "normalOpen";
    }
    if (item.flag >= 1) {
      return "normalFlag";
    }
    return "normalItems";
  };

  const renderGameState = () => {
    switch (gameState) {
      case "lose":
        return <Lose />;
      case "win":
        return <Win />;
      default:
        return "playing";
    }
  };

  return (
    <div className="normalBoxs">
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

export default NormalBoxs;
