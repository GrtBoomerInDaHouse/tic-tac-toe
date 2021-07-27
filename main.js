const gameBoard = ( () => {

let bord = [];

for (i=1; i<=9; i++){

    bord.push(i);
}

return {bord};

})()


const Player = (name, tool) => {
    const hit = cube =>{

        gameBoard.bord.splice(cube, 1, tool)


    }
    return {name, tool, hit};

}


const ricardo = Player('ricardo', "X");
const nikolas = Player('Nikolas Keige', "O");



document.addEventListener('click', e=>{

    if(e.target.matches('.cube')){
        
       if (e.target.textContent === ""){

        setTurn(ricardo, nikolas).hit(e.target.id-1)
        e.target.textContent = gameBoard.bord[e.target.id-1]
      
       let win = checkWinner(gameBoard.bord)

       win === "X" || win === "O" ? alert("THATS MY BOY " + win): console.log('NOT YET')}else{
           return
       }
       
    }
    
   
});



function setTurn (pl1,pl2) {

   let a= gameBoard.bord.filter((el)=>{
       return el === 'X';  
   });
   
    let b = gameBoard.bord.filter((el)=>{
        return el === 'O'
    })

    if(a.length > b.length){
        return pl2;
    }else{
        return pl1;
    }

   
}


function checkWinner(gbord){
let a = [...gbord]
let bord = ['','',''].map(()=>{return a.splice(0,3)});
let winner = '';

for(i=0;i<bord.length;i++){

    if(bord[i][0] === bord[i][1] && bord[i][0] === bord[i][2]){


        winner = bord[i][0]
       

    }else if(bord[0][i] === bord[1][i] && bord[0][i] === bord[2][i]){


        winner = bord[0][i]
       
    }else if(bord[0][0] === bord[1][1] && bord[0][0] === bord[2][2] ){

        winner = bord[0][0]  
       
    } else if(
        bord[0][2] === bord[1][1] && bord[0][2] === bord[2][0]){
            winner = bord[0][2]
        }
    
}


return winner;

}





