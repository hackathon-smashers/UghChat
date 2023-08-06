"use client"

import React, { useEffect, useState } from 'react';
import './SmokeEffect.css';

const SmokeEffect = () => {
  const [smoke, setSmoke] = useState<Array<number>>([]);

  useEffect(() => {
    const smokeInterval = setInterval(() => {
      setSmoke((prevSmoke) => {
        if (prevSmoke.length < 50) {
          return [...prevSmoke, Math.random() * 100];
        } else {
          return prevSmoke.slice(1);
        }
      });
    }, 100);

    return () => {
      clearInterval(smokeInterval);
    };
  }, []);

  return (
    <div className="smoke-effect-container">
      {smoke.map((top, index) => (
        <div
          key={index}
          className="smoke-effect"
          style={{
            top: `${top}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SmokeEffect;