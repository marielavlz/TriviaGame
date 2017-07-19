
$(document).ready(function(){

//Timer goes here. When the timer runs out, the showResults function displays.

(function() {
  
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
      question: "Who was Hand of the King during Joffrey's reign?",
      answers: {
        a: "Tywin Lannister",
        b: "Tyrion Lannister",
        c: "Ned Stark",
        d: "Two of the Above"
      },
      correctAnswer: "d"
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

  function buildQuiz() {
    // store the HTML output
    var output = [];

    // Store a list of choices for each question.
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answers = [];

      // and for each available answer add an HTML radio button to prevent more than one choice.
      for (letter in currentQuestion.answers) {
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
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

      } else {
        // if answer is wrong or blank
        //I should add something here but Idk yet
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  //submitButton.addEventListener("click", showResults);
  //previousButton.addEventListener("click", showPreviousSlide);
  //nextButton.addEventListener("click", showNextSlide);

  $("#next").on("click", function(){
    showNextSlide();
  });
  $("#previous").on("click", function(){
    showPreviousSlide();
  });
  $("#submit").on("click", function(){
    showResults();
  })
})();


});

  //Set a timer to a total of 40 seconds that begins when the page loads
  //Create a timer object
  //add the array of questions and choices onto the page with an option to click on any choice.
  //Once the users select their choices, they click submit.
  //Upon clicking submit, the answer choices selected are compared to the correct answer choices.
  //A tally is taken of correct responses and incorrect responses without specifying which question was answered correctly or incorrectly
  //The results are then displayed at the bottom of the page or somehow whenever
 
