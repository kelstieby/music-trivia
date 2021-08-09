import React, { useState, useEffect } from "react";
import axios from "axios";
import { AllHtmlEntities, decode } from "html-entities";

const entities = new AllHtmlEntities();

const Trivia = () => {
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
    }
    axios.get('https://opentdb.com/api.php?amount=1&category=12&type=boolean').then((response) => {
      const result = response.data.results[0];

      setQuestion(result.question);
      setAnswer(result.correct_answer);
    })
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
    <div className="w-full h-screen flex flex-row justify-center">
      <div className="flex flex-col justify-center mx-auto">
        <h1 className="mx-auto p-5 text-5xl">Music Trivia!</h1>
        <h3 className="mx-auto text-2xl">Current Streak: {streak}</h3>
        <h3 className="mx-auto text-2xl">Highest Streak: {highestStreak}</h3>
        <br></br>
        <div className="p-5 w-5/6 mx-auto text-center bg-black text-white rounded-md">
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
  );
};

export default Trivia;
