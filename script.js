let boxes = document.querySelectorAll(".box") ;
let newGameButton = document.querySelector(".new-game-button") ;
let winnerDecleration = document.querySelector(".winner-decleration") ;

let currentPlayer ;
let gameGrid ;


const winningPosition = [
    [0,1,2] ,
    [3,4,5] ,
    [6,7,8] ,
    [0,3,6] ,
    [1,4,7] ,
    [2,5,8] ,
    [0,4,8] ,
    [2,4,6] ,
]


function gameInit(){
    currentPlayer = "X" ;
    gameGrid = ["", "", "", "", "", "", "", "", ""] ;

    newGameButton.classList.remove("active") ;

    winnerDecleration.textContent = `Current Player-${currentPlayer}` ;

    boxes.forEach((box,index) => {
        box.innerText = "" ;
        boxes[index].style.pointerEvents = "all" ;
        box.classList.remove("win") ;
        // 1 thing missing
    }) ;


}
gameInit() ;


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O" ;
    } 
    else{
        currentPlayer = "X" ;
    }
    winnerDecleration.textContent = `Current Player-${currentPlayer}` ;

}


function checkGameOver() {
    let answer = "" ;

    winningPosition.forEach(position =>{
        if( (gameGrid[position[0]] !== "") && (gameGrid[position[1]] !== "") && (gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]]){
            //winner found
            if(gameGrid[position[0]] == "X"){
                answer = "X" ;
            }
            else{
                answer = "O" ;
            }


            boxes[position[0]].classList.add("win") ;
            boxes[position[1]].classList.add("win") ;
            boxes[position[2]].classList.add("win") ;
            
            
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none" ;
            })
            
            
        }

        if(answer !== ""){
            winnerDecleration.textContent = `Winner Player - ${answer}` ;
            newGameButton.classList.add("active") ;
            return ;
        }

        
        //checking for a tie
        let fillCount = 0 ;
        gameGrid.forEach( (box) => {
            if(box !== "") fillCount++ ;
        }) ;
        
        if(fillCount == 9){
            winnerDecleration.textContent = `Tie` ;
            newGameButton.classList.add("active") ;
            box.style.pointerEvents = "none" ;
            return ;
        }
    }) ;

    
}

// [0,1,2] ,
// [3,4,5] ,
// [6,7,8] ,
// [0,3,6] ,
// [1,4,7] ,
// [2,5,8] ,
// [0,4,8] ,
// [2,4,6] ,

function handleClick(index) {
    if(gameGrid[index] === ""){

        //change in UI
        boxes[index].innerHTML = currentPlayer ;
        gameGrid[index] = currentPlayer ;
        boxes[index].style.pointerEvents = "none" ;
        
        swapTurn() ;
        checkGameOver() ;



        //check if win
    }
}



boxes.forEach((box,index) => {
    box.addEventListener("click" ,() =>{
        handleClick(index) ;
    }) ;
}) ;


newGameButton.addEventListener("click" , () => {
    gameInit() ;
}) ;