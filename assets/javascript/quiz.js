
$(document).ready(function(){

    $("#introSection").hide();
    $("#messageSection").hide();
    //$("#resetButton").hide();
    //Fade in the page elements
    $("#introSection").fadeIn(1000 * 1, function() {
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;

    //This entire section is not working. Not generating random congrats.
    var congratsMessages = ['You are a Lord of the Rings master!', 'A Ring of Power for you!', "Tolkien would be proud!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", function(){
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "What is the name of the story Bilbo wrote about his adventures?",
            "c": [
              "The Hobbit by Bilbo Baggins", 
              "The Silmarillion by Bilbo Baggins", 
              "A Hobbit's Tale by Bilbo Baggins", 
              "Into the West by Bilbo Baggins"
            ],
            "answer": 2
        },
        // question 2
        {
            "q": "By what name do the Elves call Gandalf?",
            "c": [
              "The Grey Pilgrim", 
              "Incanus", 
              "Gandalf the Grey",
              "Mithrandir"
            ],
            "answer": 3
        },
        // question 3
        {
            "q": "What is the name of Aragorn's ring, the Ring of_______?",
            "c": [
              "Narya", 
              "Barahir", 
              "Nenya",
              "Vilya"
            ],
            "answer": 1
        },
        // question 4
        {
            "q": "From whom did Elrond recieve his ring of power?",
            "c": [
              "Gil Galad", 
              "Galadriel", 
              "Luthien",
              "Aragorn I"
            ],
            "answer": 0
        },
        // question 5
        {
            "q": "Who is the proprietor of the Prancing Pony?",
            "c": [
              "Bill Ferny", 
              "Barliman Butterbur", 
              "Forlong the Fat",
              "Tom Pickthorn"
            ],
            "answer": 1
        },
        // question 6
        {
            "q": "Who was the original Dark Lord of Middle-Earth?",
            "c": [
              "Sauron", 
              "Annatar", 
              "Melkor",
              "Thuringwithal"
            ],
            "answer": 2
        },
        // question 7
        {
            "q": "How many palantiri were brought to Middle-Earth?",
            "c": [
              "3",
              "5",
              "7",
              "9"
              ],
            "answer": 2
        },
        // question 8
        {
            "q": "What were the names of the eagles who rescued Frodo and Sam from Mount Doom?",
            "c": [
              "Gwaihir, Landroval, and Meneldor", 
              "Crebain, Shadowfax, and Brego", 
              "Gwaihir, Ecthelion, and Idrial",
              "Golfimbul, Azog, and Stybba"
            ],
            "answer": 0
        },
        // question 9
        {
            "q": "What three swords were found in the Trolls Cave in The Hobbit?",
            "c": [
              "Sting, Anduil, and The White Knife of Legolas",
              "Narsil, Glamdring, and Hadhafang",
              "Aeglos, Orcrist, and Sting",
              "Orcrist, Sting, and Glamdring"
              ],
            "answer": 3
        },
        // question 10
        {
            "q": "What is the secret word that opens the Gates of Moria?",
            "c": [
              "Belok", 
              "Mellon", 
              "Danwaith",
              "Galad"
              ],
            "answer": 1
        },
        // question 11
        {
            "q": "Which one is not a son of Feanor?",
            "c": [
                "Maehdros",
                "Celegorm",
                "Curufin",
                "Fingon"

            ],
            "answer": 3
        },
        // question 12
        {
            "q": "How many ruling queens did the kingdom of Numenor have?",
            "c": [
                "3",
                "2",
                "4",
                "7"
            ],
            "answer": 0
        },
        // question 13
        {
            "q": "Telperion and Laurelin were the names of what?",
            "c": [
                "Mountains",
                "Maiar",
                "Trees",
                "Noldor Elves"
            ],
            "answer": 2
        },
        // question 14
        {
            "q": "Who is the father of Legolas Greenleaf?",
            "c": [
                "Oropher",
                "Thranduil",
                "Finarfin",
                "Celeborn"
            ],
            "answer": 1
        },
        // question 15
        {
            "q": "What were the four groups of Elves?",
            "c": [
                "Teleri, Noldor, Iminyar, Sindar",
                "Noldor, Tatyar, Sindar, Vanyar",
                "Avari, Vanyar, Noldor, Sindar",
                "Teleri, Noldor, Vanyar, Avari"
            ],
            "answer": 3
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame();
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and tallies the final score
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $("#resetButton").show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You've Done It!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);




    };


    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
 
