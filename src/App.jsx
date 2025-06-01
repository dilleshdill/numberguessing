import { useState, useEffect } from 'react';

import './App.css'; 

export default function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle'); 
  const [guessHistory, setGuessHistory] = useState([]);
  const [hint, setHint] = useState('');


  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameStatus('playing');
    setGuessHistory([]);
    setHint('');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    
    const guessedNumber = parseInt(guess);
    
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      setMessage('Please enter a valid number between 1 and 100');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guessedNumber]);

    if (guessedNumber === targetNumber) {
      setMessage(`🎉 Correct! You guessed the number in ${newAttempts} attempts!`);
      setGameStatus('won');
      setHint('');
    } else if (guessedNumber < targetNumber) {
      setMessage('Too low! Try a higher number.');
      setHint(guessedNumber % 2 === 0 ? 'Hint: The number is odd' : 'Hint: The number is even');
    } else {
      setMessage('Too high! Try a lower number.');
      setHint(guessedNumber % 2 === 0 ? 'Hint: The number is odd' : 'Hint: The number is even');
    }

    setGuess('');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 min-h-screen w-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-white/5 p-6 border-b border-white/10">
            <h1 className="text-3xl font-bold text-center text-white">Number Guessing Game</h1>
            <p className="text-center text-white/80 mt-2">Guess a number between 1 and 100</p>
          </div>
          
          {/* Game Area */}
          <div className="p-6">
            {/* Game Messages */}
            <div className="text-center text-lg font-medium text-white mb-4 min-h-12">
              {message && <p className="animate__animated animate__fadeIn">{message}</p>}
              {hint && <p className="text-sm mt-2 text-yellow-300">{hint}</p>}
            </div>
            
            {/* Input Area */}
            {gameStatus === 'playing' && (
              <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="number" 
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your guess"
                  min="1"
                  max="100"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 !bg-purple-600 hover:!bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900"
                >
                  Submit Guess
                </button>
              </form>
            )}
            
            {/* Game Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-sm text-white/70">Attempts</p>
                <p className="text-2xl font-bold text-white">{attempts}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-sm text-white/70">Last Guess</p>
                <p className="text-2xl font-bold text-white">
                  {guessHistory.length > 0 ? guessHistory[guessHistory.length - 1] : '-'}
                </p>
              </div>
            </div>
            
            {/* Guess History */}
            {guessHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2">Your Guesses:</h3>
                <div className="flex flex-wrap gap-2">
                  {guessHistory.map((g, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        g === targetNumber 
                          ? 'bg-green-500 text-white' 
                          : g < targetNumber 
                            ? 'bg-blue-400 text-white' 
                            : 'bg-red-400 text-white'
                      }`}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Game Button */}
            {(gameStatus === 'won' || gameStatus === 'playing') && (
              <button
                onClick={startNewGame}
                className="w-full px-6 py-3 !bg-white/10 hover:!bg-white/20 border !border-white/20 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-900"
              >
                {gameStatus === 'won' ? 'Play Again' : 'New Game'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}