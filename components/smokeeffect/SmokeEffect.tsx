"use client"

import React, { useEffect, useState } from "react";
import "./SmokeEffect.css";

interface SmokeParticle {
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}

const Smoke: React.FC = () => {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const numParticles = 500;
    const newParticles: SmokeParticle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 8 + 2; // Particle size between 2 and 10
      const animationDuration = Math.random() * 5000 + 3000; // Animation duration between 3s and 8s

      newParticles.push({ x, y, size, animationDuration });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="smoke-container">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="smoke-particle"
          style={{
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.animationDuration}ms`,
            left: particle.x,
            top: particle.y,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Smoke;