import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const emojis = ['🐶', '🐱', '🐵', '🦁', '🐸', '🐰'];

function shuffle(array) {
  const arr = [...array, ...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.map((value, index) => ({ id: index, value, flipped: false, matched: false }));
}

export function MemoryGameFunction() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [preview, setPreview] = useState(true);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const level = 1;

  useEffect(() => {
    const newCards = shuffle(emojis);
    setCards(newCards);
    setTimeout(() => setPreview(false), 1000);
  }, []);

  const handleCardClick = (id) => {
    if (preview || flipped.includes(id) || cards[id].matched) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].value === cards[b].value) {
        const updatedCards = [...cards];
        updatedCards[a].matched = true;
        updatedCards[b].matched = true;
        setCards(updatedCards);
        setMatched([...matched, a, b]);
        setScore(score + 10);
        setCorrect(correct + 1);
      } else {
        setIncorrect(incorrect + 1);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const resetGame = () => {
    const newCards = shuffle(emojis);
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setPreview(true);
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setTimeout(() => setPreview(false), 1000);
  };

  return (
    <div className="memory-game">
      <h2>Memory Game - Functional Component</h2>
      <div className="scoreboard">
        <p className="score-item">Level: {level}/6</p>
        <p className="score-item">Score: {score}</p>
        <p className="score-item">Correct: {correct}</p>
        <p className="score-item">Incorrect: {incorrect}</p>
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) || preview ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <span>{(flipped.includes(index) || matched.includes(index) || preview) ? card.value : '❓'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
