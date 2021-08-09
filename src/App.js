import React, { useState, useEffect } from "react";
import axios from "axios";
import { AllHtmlEntities, decode } from "html-entities";
import './App.css';

const entities = new AllHtmlEntities();

const App = () => {

  const [page, setPage] = useState("Start");

  const handleStart = () => {
    setPage("Trivia");
  }

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=1&category=12&type=boolean').then((response) => {
      const result = response.data.results[0];

      setQuestion(result.question);
      setAnswer(result.correct_answer);
    })
  }, []);

  const checkAnswer = (choice) => {
    if (choice === answer) {
      setStreak(prevStreak => prevStreak+1)
    } else {
      checkHighestStreak();
      setStreak(0);
      setPage("GameOver")
    }
    axios.get('https://opentdb.com/api.php?amount=1&category=12&type=boolean').then((response) => {
      const result = response.data.results[0];

      setQuestion(result.question);
      setAnswer(result.correct_answer);
    })
  }

  const startOver = () => {
    setPage("Trivia");
  }

  const checkHighestStreak = () => {
    if (highestStreak < streak) {
      setHighestStreak(streak);
    }
  }

  const handleTrue = () => {
    checkAnswer("True");
  }

  const handleFalse = () => {
    checkAnswer("False");
  }

  return (
    <div className="background font-mono">
      {page === "Start" && <div>
        <div className="w-full h-screen flex flex-row justify-center">
              <div className="flex flex-col justify-center mx-auto">
                <div className="bg-purple-400 p-5 text-center rounded-md">
                  <h1 className="text-4xl p-2 mx-auto font-bold">Welcome to Music Trivia!</h1>
                  <h3 className="text-xl p-2">See how many questions you can answer correctly in a row...</h3>
                  <br></br>
                  <button 
                      type="button"
                      onClick={handleStart}
                      className="border border-purple-800 text-purple-800 font-extrabold rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-purple-900 focus:outline-none focus:shadow-outline mx-auto"    
                  >Start Game!</button>
                </div>
              </div>
        </div>
      </div>}
      {page === "Trivia" && <div>
        <div className="w-full h-screen flex flex-row justify-center">
        <div className="flex flex-col justify-center mx-auto">
          <div className="bg-purple-400 p-5 text-center m-10 rounded-md">
          <h1 className="mx-auto p-5 text-5xl font-bold">Music Trivia!</h1>
          <h3 className="mx-auto text-2xl">Current Streak: {streak}</h3>
          <h3 className="mx-auto text-2xl">Highest Streak: {highestStreak}</h3>
          <br></br>
          <div className="p-5 w-5/6 mx-auto text-center bg-purple-800 text-white rounded-md">
            {entities.decode(question)}
            <br></br>
            <div className="flex mx-auto justify-center">
              <button 
                type="button"
                onClick={handleTrue}
                className="border border-green-500 text-green-500 font-extrabold text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
                >true</button>
              <button 
                type="button"
                onClick={handleFalse}
                className="border border-red-500 text-red-500 font-extrabold text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
                >false</button>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>}
      {page === "GameOver" && <div>
        <div className="w-full h-screen flex flex-row justify-center bg-red-400 backdrop-filter backdrop-opacity-sm">
        <div className="flex flex-col justify-center mx-auto">
          <div className="p-5 w-5/6 mx-auto text-center bg-black text-white rounded-md border border-red-500 border-100">
              <h1 className="font-bold text-7xl text-red-500 p-8">GAME OVER</h1>
              <h3 className="text-3xl">You answered incorrectly :(</h3>
              <br className="p-5"></br>
              <button 
                type="button"
                onClick={startOver}
                className="border border-blue-500 text-blue-500 font-extrabold text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >try again</button>
          </div>
        </div>
        </div>
      </div>}
    </div>
  );
};

export default App;
