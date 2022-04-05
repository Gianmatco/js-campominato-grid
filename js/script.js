/*
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


1. al click sul bottone play avvio il gioco

2.avvio il gioco: prendo l'input del livello di gioco dall'utente  setto il livello del gioco 
e a seconda del livello selezionato definisco quanti quadratini devo creare e quante celle per lato avrà la mia griglia

3.creare la griglia di dimensioni uguali a quelle scelte quindi per ogni cella

4. creare la cella ed impostare la classe di base e altezza e larghezza; e ritornare la cella creata

5. al click colorare la cella 


1. Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.


2. In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso

3. e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
*/
// Utility
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const BOMB_NUMBER = 16;
  const bombs = [];
  let max_attempt;
  let attempts = 0;
  
  function setLevel(event) {
    //console.log(this);
    //console.log(event.target);
    //event.preventDefault();
    const level = document.getElementById("level").value;
    console.log("livello selezionato: ", level);
    let numSquare;
    switch (level) {
      case "1":
      default:
        numSquare = 100;
        break;
      case "2":
        numSquare = 81;
        break;
      case "3":
        numSquare = 49;
        break;
    }
    let squareperSide = Math.sqrt(numSquare);
    console.log("celle per lato: ", squareperSide);
    generateBomb(numSquare);
    generaGriglia(numSquare, squareperSide);
  }
  
  function generateBomb(numSquare) {
    max_attempt = numSquare - BOMB_NUMBER;
    while (bombs.length < BOMB_NUMBER) {
      let bombNUmber = getRandomInt(1, numSquare);
      if (!bombs.includes(bombNUmber)) {
        bombs.push(bombNUmber);
      }
    }
  }
  function generaGriglia(numSquare, squareperSide) {
    console.log("numero di celle totali: ", numSquare);
    const app = document.getElementById("app");
    app.innerHTML = "";
    let row = document.createElement("div");
    row.setAttribute("class", "gridrow");
    for (let i = 1; i <= numSquare; i++) {
      const square = generaCella(i, squareperSide);
      row.append(square);
    }
    app.append(row);
  }
  function generaCella(numSquare, squareperSide) {
    let square = document.createElement("div");
    square.setAttribute("class", "box");
    square.style.width = `calc(100% / ${squareperSide})`;
    square.style.height = `calc(100% / ${squareperSide})`;
    square.classList.add("pointer");
    square.innerHTML = `<span>${numSquare}</span>`;
    square.addEventListener("click", coloraCella);
    return square;
  }
  function coloraCella() {
    //console.log(this.innerText);
    let num = parseInt(this.innerText);
    attempts++;
    if (bombs.includes(num)) {
      this.style.backgroundColor = "red";
      this.innerHTML = `<img src="src/img/bomb.png">`;
      gameOver();
    } else {
      this.style.backgroundColor = "#6495ed";
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
  }
  function gameOver() {}
  //document.getElementById("level").addEventListener("change", setLevel);
  document.getElementById("play").addEventListener("click", setLevel);
  
  