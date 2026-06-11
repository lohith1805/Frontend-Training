import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-card">
      <div className="counter-card__info">
        <p className="counter-card__label">🎯 useState Demo — Click Counter</p>
        <p className="counter-card__desc">
          This counter uses <code>useState</code> hook to manage state. Every button click triggers a re-render.
        </p>
      </div>
      <div className="counter-card__controls">
        <button className="counter-btn counter-btn--minus" onClick={() => setCount(c => c - 1)}>−</button>
        <span className="counter-card__value">{count}</span>
        <button className="counter-btn counter-btn--plus" onClick={() => setCount(c => c + 1)}>+</button>
        <button className="counter-btn counter-btn--reset" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
