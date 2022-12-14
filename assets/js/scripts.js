// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    // This function enables the option to hit enter to submit answer. It will listen to "any key" pressed
    // and then call a function, which is in our case an event. If so, it will check if the event key was
    // the Enter key and if so, it will call the checkAnswer function.
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
});


/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    // This code will clear the result box after submit question is done
    // in order to always show an empty box.
    document.getElementById("answer-box").value = "";

    // This code will make sure the cursor is in the answer box field immediately
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25. By default the rand generates only numbers
    // between 0 and 1 and floats, so we have to "floor" them down and we multiply it 
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);

    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}.`);
        // throw will stop the script and send the message to the console
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
};


/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    // if isCorrect is a shortcut to check if isCorrect = true
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}


/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the dom, and retursn the correct answer
 */
function calculateCorrectAnswer() {
    // parseInt is used to parse the values from dom as integers versus the
    // defautl when parsing dom by js, which is a string
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Gets the currenct score from the dom and increments it by 1
 */
function incrementScore() {
    // innerText and textContent are interchargeable, more or less the same
    // we get the old scrore from dom and store it in oldScore
    let oldScore = parseInt(document.getElementById("score").innerText);
    // we set the new score with above line. We take the oldScore variable
    // and by the ++ we add 1 to it
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the currenct tally of incorrect answers from the dom and increments it by 1
 */
 function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}


function displayAdditionQuestion(operand1, operand2) {
    // below statement will get the html element id operand1 and will set its
    // text content to the operand1 value, which we got when calling this
    // function. Basically num1 becomes opernad1 when calling this function
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

// In order to ake sure the first operand is divisible by the second 
// operand by multiplying your two random numbers and using the result as operand1
function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = (operand1 * operand2);
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}
