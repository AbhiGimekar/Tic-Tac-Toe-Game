let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array 

let winningPattern = [
    [0 , 1 , 2] ,
    [3 , 4 , 5] ,
    [6 , 7 , 8] ,
    [0 , 3 , 6] ,
    [1 , 4 , 7] ,
    [2 , 5 , 8] ,
    [0 , 4 , 8] ,
    [2 , 4 , 6] ,
] ;

// Player 'X' plays First
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

// Enable All Buttons (for New Game Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup
    popupRef.classList.add("hide");
};


// This function is executed when player wins
const winFunction = (letter) =>{
    disableButtons();

    if(letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins"; 
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins"; 
    }
};

// Function For Draw
const drawFunction = () =>{
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};



// New Game
newgameBtn.addEventListener("click" , () =>{
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click" , () =>{
    count = 0;
    enableButtons();
});


// WIN Logic
const winchecker = () => {
    // loop through all win patterns
    for (let i of winningPattern){
        let [element1 , element2 , element3] = [
            btnRef[i[0]].innerText ,
            btnRef[i[1]].innerText ,
            btnRef[i[2]].innerText ,
        ];

        if(element1 != "" && element2 != "" && element3 != ""){
            if((element1 == element2) && (element2 == element3)){
                winFunction(element1);
            }
        }
    }
}


// Display X/O on click 

btnRef.forEach((element) =>{
    element.addEventListener("click" , () => {
        if(xTurn){
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        }
        else{
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }

        // Increment count on Each Click
        count += 1;
        if(count == 9){
            drawFunction();
        }
        winchecker();
    });
});

// enable Buttons and disable popup on page load
window.onload = enableButtons;