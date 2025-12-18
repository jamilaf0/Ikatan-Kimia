
import React, { useEffect, useState } from 'react';

const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💮'];

const FloatingFlowers: React.FC = () => {
  const [flowers, setFlowers] = useState<{ id: number; left: string; size: string; duration: string; emoji: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFlower = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 1 + 1.5}rem`,
        duration: `${Math.random() * 5 + 10}s`,
        emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
      };
      setFlowers(prev => [...prev.slice(-15), newFlower]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flower-anim fixed inset-0 z-0 overflow-hidden">
      {flowers.map(f => (
        <div
          key={f.id}
          className="floating-flower"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDuration: f.duration,
            bottom: '-50px',
          }}
        >
          {f.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingFlowers;
