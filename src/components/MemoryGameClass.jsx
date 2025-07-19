import React, { Component } from 'react';
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

export class MemoryGameClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flipped: [],
      matched: [],
      preview: true,
      level: 1,
      score: 0,
      correct: 0,
      incorrect: 0,
    };
  }

  componentDidMount() {
    const cards = shuffle(emojis);
    this.setState({ cards });
    setTimeout(() => this.setState({ preview: false }), 1000);
  }

  handleCardClick = (id) => {
    const { cards, flipped, matched, preview } = this.state;
    if (preview || flipped.includes(id) || cards[id].matched) return;

    const newFlipped = [...flipped, id];
    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].value === cards[b].value) {
        cards[a].matched = true;
        cards[b].matched = true;
        this.setState({
          matched: [...matched, a, b],
          score: this.state.score + 10,
          correct: this.state.correct + 1,
        });
      } else {
        this.setState({ incorrect: this.state.incorrect + 1 });
      }
      setTimeout(() => this.setState({ flipped: [] }), 1000);
    }
    this.setState({ flipped: newFlipped });
  };

  resetGame = () => {
    const cards = shuffle(emojis);
    this.setState({
      cards,
      flipped: [],
      matched: [],
      preview: true,
      score: 0,
      correct: 0,
      incorrect: 0,
    });
    setTimeout(() => this.setState({ preview: false }), 1000);
  };

  render() {
    const { cards, flipped, matched, score, correct, incorrect, level, preview } = this.state;
    return (
      <div className="memory-game">
        <h2>Memory Game - Class Component</h2>
        <div className="scoreboard">
          <p className="score-item">Level: {level}/6</p>
          <p className="score-item">Score: {score}</p>
          <p className="score-item">Correct: {correct}</p>
          <p className="score-item">Incorrect: {incorrect}</p>
        </div>
        <button className="reset-button" onClick={this.resetGame}>Reset Game</button>
        <div className="card-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${flipped.includes(index) || matched.includes(index) || preview ? 'flipped' : ''}`}
              onClick={() => this.handleCardClick(index)}
            >
              <span>{(flipped.includes(index) || matched.includes(index) || preview) ? card.value : '❓'}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}