import React from 'react';

function Question({ question, selectedOption, onOptionSelect, onNextQuestion, questionNumber, totalQuestions }) {
  // Calculate progress percentage
  const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100;

  const handleOptionClick = (index) => {
    onOptionSelect(index);
  };

  const handleNextClick = () => {
    onNextQuestion();
  };

  return (
    <div className="question-container">
      {/* Progress bar */}
      <div className="progress mb-4">
        <div 
          className="progress-bar bg-success" 
          role="progressbar" 
          style={{ width: `${progressPercentage}%` }} 
          aria-valuenow={progressPercentage} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
      
      <h2 className="mb-3">Question {questionNumber}</h2>
      <div className="question-text mb-4">
        <h3>{question.text}</h3>
      </div>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <div className="form-check mb-3" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name="quizOption"
              id={`option${index}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionClick(index)}
            />
            <label 
              className={`form-check-label w-100 p-3 ${selectedOption === index ? 'answer-selected' : ''}`}
              htmlFor={`option${index}`}
              style={{
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: selectedOption === index ? '#e9ecef' : 'transparent',
                boxShadow: selectedOption === index ? '0 3px 10px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <span className="option-letter me-2">{String.fromCharCode(65 + index)}.</span> {option}
            </label>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleNextClick}
          disabled={selectedOption === null}
        >
          {questionNumber === totalQuestions ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default Question;
