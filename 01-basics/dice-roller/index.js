function rollDice(){

    const numofdice=Number(document.getElementById("numofdice").value);
    const diceResult=document.getElementById("diceResult");
    const diceImages=document.getElementById("diceImages");
    const values=[];
    const images=[];

    if(numofdice<1 || numofdice>50){
        window.alert("Enter between 1 to 50.");
    }
    else{
        for(let i=0; i<numofdice; i++){
            const value=Math.floor(Math.random()*6)+1;
            values.push(value);
            images.push(`<img src="images/${value}.png" alt="Dice ${value}">`);
        }

        diceResult.textContent=`dice: ${values.join(`, `)}`;
        diceImages.innerHTML=images.join(``);
    }
}