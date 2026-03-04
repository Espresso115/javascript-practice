const choices=["rock", "paper", "scissors"];
const playerDisplay=document.getElementById("playerDisplay");
const computerDisplay=document.getElementById("computerDisplay");
const resultDisplay=document.getElementById("resultDisplay");

let playerPoints=0;
let computerPoints=0;

function playGame(playerChoice){
    const computerChoice=choices[Math.floor(Math.random()*3)];
    let result="";

    if(playerChoice===computerChoice){
        result="IT'S A TIE!";
    }
    else{
        switch(playerChoice){
            case "rock":
                result=(computerChoice==="scissors")?"YOU WIN!":"YOU LOSE!";
                break;
            case "paper":
                result=(computerChoice==="rock")?"YOU WIN!":"YOU LOSE!";
                break;
            case "scissors":
                result=(computerChoice==="paper")?"YOU WIN!":"YOU LOSE!";
                break;
        }
    }


    resultDisplay.classList.remove("greenText", "redText", "yellowText");


    switch(result){
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerPoints++;
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText");
            computerPoints++;
            break;
        case "IT'S A TIE!":
            resultDisplay.classList.add("yellowText");
            break;
    }

    playerDisplay.textContent=`PLAYER (points: ${playerPoints}): ${playerChoice}`;
    computerDisplay.textContent=`COMPUTER (points: ${computerPoints}): ${computerChoice}`;
    resultDisplay.textContent=result;

}