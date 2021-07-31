import React, { useState } from "react";
import "./Home.css";
import EasyBoxs from "../levels/easy/index";
import NormalBoxs from "../levels/intermediate";
import HardBoxs from "../levels/hard";
import Start from "../Start/Start";
import LevelSet from "../levels/levelSet";

const Home = () => {
  const [bombNumber, setBombNumber] = useState(0);
  const [gameLevel, setGameLevel] = useState();
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState(false);

  const begin = () => {
    if (timer === 0 && gameLevel > 0) {
      setStatus(setInterval(() => setTimer((prvState) => prvState + 1), 1000));
    }
  };

  const reset = () => {
    if (gameLevel > 0) {
      window.location.reload();
    }
  };

  const setEasy = () => {
    setGameLevel(1);
    setBombNumber(10);
    setTimer(0);
    clearInterval(status);
  };
  const setNormal = () => {
    setGameLevel(2);
    setBombNumber(25);
    setTimer(0);
    clearInterval(status);
  };
  const setHard = () => {
    setGameLevel(3);
    setBombNumber(60);
    setTimer(0);
    clearInterval(status);
  };

  const gameBox = () => {
    if (gameLevel === 1) {
      return (
        <EasyBoxs start={begin} timer={timer} status={status} reset={reset} />
      );
    } else if (gameLevel === 2) {
      return <NormalBoxs start={begin} timer={timer} status={status} />;
    } else if (gameLevel === 3) {
      return <HardBoxs start={begin} timer={timer} />;
    }
  };

  return (
    <div className="Home">
      <Start
        start={begin}
        timer={timer}
        reset={reset}
        bombNumber={bombNumber}
      />
      {gameBox()}
      <LevelSet esy={setEasy} nrml={setNormal} hrd={setHard} />
    </div>
  );
};

export default Home;
