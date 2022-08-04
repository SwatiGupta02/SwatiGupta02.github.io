let timer_array = [];
const game = {timer:null,start:null,end:null};
const questions = [
	{
		"question": "Which sports the tropy Ashes Series belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Asia Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Benson and Hedges belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy C. K. Naidu Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Coach Behar Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Deodhar Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Duleep Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy G. D. Birla Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Ghulam Ahmed Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  ICC Champions Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  ICC World Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  Irani Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Moinuddowla Gold Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy MRF World Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Nehru Cup (Jawaharlal Nehru Cup) belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rani Jhansi Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Ranji Trophy  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Reliance Cup  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Rohinton Baria Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Rothman’s Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Sahara Cup  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  Sheesh Mahal Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Vijay Merchant Trophybelongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Vizzy Trophy  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Wills Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Chakra Gold Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Bandodkar Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Colombo Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy D. C. M. Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Dr. B. C. Roy Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Dr. B.C. Roy Trophy: Football (Junior) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Durand Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Durand Cup, F. A. Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy European Champions Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy F. A. Shield belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy FA Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Federation Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy FIFA World Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy G.V. Raja Memorial Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy IFA Shield belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Jules Rimet Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Kalinga Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Merdeka Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Najee Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Nixon Gold Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Raghbir Singh Memorial Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Rovers Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Sanjay Gold Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Santosh Trophy (National Football) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Scissor Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Sir Ashutosh Mukherjee Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Subrata Mukherjee Cup (National school football) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Subroto Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Todd Memorial Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Vittal Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	}
]
]
let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    endTimer();
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
    var T = document.getElementById("TestsDiv");
    T.style.display = "none"; 
    var S = document.getElementById("TestsDivs");
    S.style.display = "none"; 
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null
    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / questions.length) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
    var wrapper = document.getElementById('timer');
    var myHTML = '';
    for(var i = 0; i < 10; i++){
        myHTML += '<tr><td>' + (i+1) + '</td><td>' + timer_array[i] + '</td></tr><br>';
    }
    wrapper.innerHTML = myHTML;

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function getOptions() {
    var T = document.getElementById("TestsDiv");
    T.style.display = "flex"; 
    var S = document.getElementById("TestsDivs");
    S.style.display = "flex"; 
    startTimer();
}


function startTimer(){
    const date = new Date(); 
    game.start = date.getTime();
 }

function endTimer(){
    const date = new Date();
    game.end = date.getTime();
    const totalTime = ((game.end-game.start)/1000);
    timer_array.push(totalTime);
    clearInterval(game.timer);
 }
