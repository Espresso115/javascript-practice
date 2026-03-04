const decreaseButton=document.getElementById("decrease");
const increaseButton=document.getElementById("increase");
const resetButton=document.getElementById("reset");
const countLabel=document.getElementById("counter");
let count=0;

increaseButton.onclick=function(){
    count++;
    countLabel.textContent=count;
}

resetButton.onclick=function(){
    count=0;
    countLabel.textContent=count;
}

decreaseButton.onclick=function(){
    count--;
    countLabel.textContent=count;
}