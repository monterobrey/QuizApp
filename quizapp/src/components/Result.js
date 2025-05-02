import React from 'react';

function Result({ score, totalQuestions, onRestart }) {
  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine result message and color based on score
  let resultMessage;
  let progressBarColor;
  
  if (percentage >= 80) {
    resultMessage = "Excellent! You're a React expert!";
    progressBarColor = "bg-success";
  } else if (percentage >= 60) {
    resultMessage = "Good job! You know React well!";
    progressBarColor = "bg-info";
  } else if (percentage >= 40) {
    resultMessage = "Not bad! Keep learning React!";
    progressBarColor = "bg-warning";
  } else {
    resultMessage = "Keep practicing! You'll improve!";
    progressBarColor = "bg-danger";
  }

  return (
    <div className="result-container text-center">
      <h2 className="mb-4">Quiz Completed!</h2>
      
      <div className="score-display mb-4">
        <h3>Your Score: {score} out of {totalQuestions}</h3>
        <h4>{percentage}%</h4>
      </div>
      
      <div className="progress mb-4" style={{ height: "30px" }}>
        <div
          className={`progress-bar ${progressBarColor}`}
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage}%
        </div>
      </div>
      
      <p className="result-message mb-4 fs-4">{resultMessage}</p>
      
      <button className="btn btn-primary btn-lg" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;