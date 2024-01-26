import React, { useState, useEffect } from 'react';
import './Simon.css';

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [Count, setCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const colors = ['red', 'blue', 'green', 'yellow'];
  console.log(sequence ,"sequence")


  useEffect(() => {
    if (!gameOver && sequence.length<Count) {
      setTimeout(() => {
        const newSequence = [...sequence, colors[Math.floor(Math.random() * 4)]];
        setSequence(newSequence);
       animateSequence(newSequence);
      }, 1000);
      console.log(sequence ,"sequence")
      console.log(Count)
      console.log(sequence.length,"n")
      console.log(userSequence, "userSequence")
    } ;
  }, [Count,gameOver]);

  const animateSequence = (seq) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === seq.length) {
        clearInterval(interval);
        setUserSequence([]);
        return;
      }
  
      animateColor(seq[i]);
      i++;
  
      setTimeout(() => {
        const btn = document.getElementById(seq[i - 1]);
        btn.classList.remove('active');
      }, 500);
  
    }, 1000); 
  };
  

  const animateColor = (color) => {
    const btn = document.getElementById(color);
    btn.classList.add('active');
  
    setTimeout(() => {
      btn.classList.remove('active');
    }, 100); 
  };
  const handleClick = (color) => {
    if (!gameOver) {
      animateColor(color);
      setUserSequence([...userSequence, color]);
      checkSequence([...userSequence, color]);
    }
  };

 const checkSequence = (userSeq) => {
    for (let i = 0; i < userSeq.length; i++) {
      if (userSeq[i] !== sequence[i]) {
        setGameOver(true);
        break;
      }
    }
    if (userSeq.length === sequence.length && !gameOver) {
      setUserSequence([])
      setCount(prevCount => prevCount + 1)
      ;
    }
  };


  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setGameOver(false);
    setCount(1);
  };

  return (
    <div className="simon-game">
      <h1>Simon Game</h1>
      <div className="simonboard">
        {colors.map((color, index) => (
          <button
            key={index}
            id={color}
            className={`simon-btn ${color}`}
            onClick={() => handleClick(color)}
            disabled={gameOver}
          />
        ))}
      </div>
      {gameOver && <p className="game-over">Game Over!</p>}
      <button className="reset-btn" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default SimonGame;