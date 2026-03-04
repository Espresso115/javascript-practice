async function fetchData(){

        const pokemonInput = document.getElementById("pokemonName");
        const pokemonName=document.getElementById("pokemonName").value.trim().toLowerCase();
        
        const imageElement=document.getElementById("pokemonImage");
        const message=document.getElementById("message");

        if(pokemonName===""){
            message.textContent="Please enter a Pokemon name."
            imageElement.style.display="none";
            return;
        }

        message.textContent="Loading..."

        try{
            const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if(!response.ok){
                throw new Error("Could not fetch resources.");
            }
        
            const data=await response.json();
            const pokemonImage=data.sprites.front_default;
       
            imageElement.src=pokemonImage;
            imageElement.style.display="block";

            message.textContent = `Showing: ${pokemonName}`;
        }
        catch(error){
            message.textContent="Pokémon not found. Try again.";
            imageElement.style.display="none";
            console.error(error);

        }
   
}

document.getElementById("pokemonName").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        fetchData();
    }
});