const app = document.getElementById("app");

app.innerHTML = `

<h1>Français avec Dino</h1>

<p>

Bienvenue

</p>

<button id="start">

Commencer

</button>

`;

document
.getElementById("start")
.addEventListener("click",()=>{

alert("Ça fonctionne !");

});
