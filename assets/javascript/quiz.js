
$(document).ready(function(){

//Timer goes here. When the timer runs out, the showResults function displays.

(function() {
  
  function buildQuiz() {
  var output = [];

    // for each question store a list of choices
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  };

  function showResults() {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    var numCorrect = 0;

    // for each question find an answer
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        $("#results").append(numCorrect);

      }
    })

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  };

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");

  var myQuestions = [
    {
      question: "Who is Jon Snow's father?",
      answers: {
        a: "Ned Stark",
        b: "Rhaegar Targaryen",
        c: "Robert Baratheon",
        d: "Jon Arryn"
      },
      correctAnswer: "b"
    },
    {
      question: "Who is the girl that accompanied Cersei on her visit to Maggy the Frog?",
      answers: {
        a: "Jeyne Westerling",
        b: "Jeyne Poole",
        c: "Elia Martell",
        d: "Melara Hetherspoon"
      },
      correctAnswer: "d"
    },
    {
      question: "How many bastard daughters does Oberyn Martell have?",
      answers: {
        a: "8",
        b: "3",
        c: "4",
        d: "5"
      },
      correctAnswer: "a"
    },
    {
      question: "What are the names of Daenerys's dragons?",
      answers: {
        a: "Viserion, Drogon, Rhaegal",
        b: "Balerion, Drogon, Rhaegal",
        c: "Balerion, Viserion, Rhaegal",
        d: "Drogon, Balerion, Viserion"
      },
      correctAnswer: "a"
    },
    {
      question: "How many White Walkers/Others has Jon Snow killed in the series?",
      answers: {
        a: "None",
        b: "One",
        c: "Two",
        d: "Three"
      },
      correctAnswer: "c"
    },
    {
      question: "Who was the last Targaryen king of Westoros?",
      answers: {
        a: "Aemon Targaryen",
        b: "Aerys Targaryen",
        c: "Aegon Targaryen",
        d: "Rhaegar Targaryen"
      },
      correctAnswer: "b"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results

  $("#submit").on("click", function() {
    showResults();
  });
  
})();

});

  //Set a timer to a total of 40 seconds that begins when the page loads
  //Create a timer object
  //add the array of questions and choices onto the page with an option to click on any choice.
  //Once the users select their choices, they click submit.
  //Upon clicking submit, the answer choices selected are compared to the correct answer choices.
  //A tally is taken of correct responses and incorrect responses without specifying which question was answered correctly or incorrectly
  //The results are then displayed at the bottom of the page or somehow whenever
