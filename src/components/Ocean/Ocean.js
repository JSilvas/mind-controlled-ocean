// src/components/Ocean/Ocean.js
import React, { useState, useEffect, useRef } from "react";
import useRafState from "react-use/lib/useRafState";

import { Simulator, Camera } from "./simulation.js"; // by David Li
import { mapCalmToWeather } from "./weather.js";

const camera = new Camera();

export function Ocean({ calm }) {
  const ref = useRef();
  const [simulator, setSimulator] = useState();
  const [lastTime, setLastTime] = useRafState(Date.now());

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    const simulator = new Simulator(ref.current, innerWidth, innerHeight);
    setSimulator(simulator);
  }, [ref, setSimulator]);

  useEffect(() => {
    if (simulator) {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000 || 0.0;
      setLastTime(currentTime);
      simulator.render(deltaTime, camera);
    }
  }, [simulator, lastTime, setLastTime]);

  return <canvas className="simulation" ref={ref}></canvas>;
}

