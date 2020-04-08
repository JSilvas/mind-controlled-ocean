// src/pages/Calm.js
import React, { useState, useEffect } from "react";
import { Ocean } from "../components/Ocean/Ocean";

export function Calm({ user, notion }) {
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const subscription = notion.calm().subscribe(calm => {
      const calmScore = Number(calm.probability.toFixed(2));
      setCalm(calmScore);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, notion]);

  return (
    <Ocean calm={calm} />
  );
}
