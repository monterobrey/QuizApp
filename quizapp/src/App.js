import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Question from './components/Question';
import Result from './components/Result';

function App() {
  // Quiz questions data
  const questions = [
    {
      id: 1,
      text: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A programming language",
        "A database management system",
        "A backend server framework"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "What is Laravel?",
      options: [
        "A JavaScript library for building user interfaces",
        "A front-end CSS framework",
        "A PHP framework for web application development",
        "A database management system"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Syntax",
        "Java Syntax Extension"
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      text: "Which company developed React?",
      options: [
        "Google",
        "Microsoft",
        "Facebook (Meta)",
        "Amazon"
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      text: "Which command is used to run a Laravel development server?",
      options: [
        "npm start",
        "php artisan serve",
        "composer run",
        "laravel run"
      ],
      correctAnswer: 1
    }
  ];

  // State variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [fadeEffect, setFadeEffect] = useState("");

  // Add fade transition effect when changing questions
  useEffect(() => {
    if (quizStarted) {
      setFadeEffect("fade-out");
      const timer = setTimeout(() => {
        setFadeEffect("fade-in");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, quizStarted]);

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  // Handle next question
  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Reset selected option
    setSelectedOption(null);

    // Check if we've reached the end of the quiz
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Handle quiz restart
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  // Handle quiz start
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="App">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header text-white text-center">
                <h1 className="mb-0">AppDev Quiz Challenge</h1>
              </div>
              <div className="card-body">
                {!quizStarted ? (
                  <div className="text-center p-4">
                    <h2 className="mb-4">Welcome to the TechQuest!</h2>
                    <p className="lead mb-4">Test your knowledge about React & Laravel with these 5 questions.</p>
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={handleStartQuiz}
                    >
                      Start Quiz
                    </button>
                  </div>
                ) : !quizCompleted ? (
                  <div className={`question-animation ${fadeEffect}`}>
                    <Question
                      question={questions[currentQuestion]}
                      selectedOption={selectedOption}
                      onOptionSelect={handleOptionSelect}
                      onNextQuestion={handleNextQuestion}
                      questionNumber={currentQuestion + 1}
                      totalQuestions={questions.length}
                    />
                  </div>
                ) : (
                  <Result
                    score={score}
                    totalQuestions={questions.length}
                    onRestart={handleRestartQuiz}
                  />
                )}
              </div>
              <div className="card-footer text-center">
                {quizStarted && !quizCompleted && (
                  <p className="mb-0">Question {currentQuestion + 1} of {questions.length}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;