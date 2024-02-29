var erros = 0;
var cardList = [
        "Aang",
        "Katara",
        "Sokka",
        "Toph",
        "Zuko",
        "Appa",
        "Momo",
        "Azula",
        "Iroh",
        "Suki"

]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    starGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    // Embaralhar
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //Random
        //troca
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function starGame() {
    //Arrumando a mesa 2x2
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            // <img id="0-0" class="card" src="Aang.jpg">
            let card = document.createElement("img")
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard)
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "Card.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("Card")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "Card.jpg";
        card2Selected.src = "Card.jpg";
        erros += 1;
        document.getElementById("erros").innerText = erros;
    }

    card1Selected = null;
    card2Selected = null;
}