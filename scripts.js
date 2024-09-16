const currentPlayer = document.querySelector('.currentPlayer');

let selected;
let player = "X";

// POSIÇÕES QUE IRÃO SER ATRIBUÍDAS A VARIÁVEL SELECTED AO LONGO DO JOGO QUE DEFINIRÁ SE UM JOGADOR IRÁ GANHAR

let winPositions = [

    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]

];

//FUNÇÃO QUE FARÁ O RESET/INÍCIO DO JOGO

function initialize(){
    selected = []

    currentPlayer.innerHTML = `Vez do jogador: <strong>${player}</strong>`;

    document.querySelectorAll('.game button').forEach((btn)=>{
        btn.innerHTML = "";
        btn.addEventListener("click" , newMove);
    })
}

//CHAMADA DA FUNÇÃO PARA SER INICIADA NA ABERTURA DA PÁGINA

initialize();



function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    //TIRA O EVENTO DE CLICK DO BOTÃO ACIONADO PARA QUE O JOGADOR NÃO FIQUE TROCANDO ENTRE X E O
    e.target.removeEventListener("click", newMove);
    //ATRIBUI O INDEX DO BOTÃO AO PLAYER QUE SELECIONOU
    selected[index] = player;
  
    //CHEGAR SE O JOGADOR GANHOU
    setTimeout(() => {
      check();
    }, [100]);
  
    //TROCA DE PLAYER
    player = player === "X" ? "O" : "X";
    //FEEDBACK DA TROCA DE PLAYER
    currentPlayer.innerHTML = `Vez do jogador: <strong>${player}</strong>`;
}
  
function check() {
    let playerLastMove = player === "X" ? "O" : "X";
  
    const items = selected.
    map((item, i) => [item, i]).
    filter((item) => item[0] === playerLastMove).
    map((item) => item[1]);
  
    // VERIFICA SE HÁ UM GANHADOR PERCORRENDO O ARRAY DE POSIÇÕES DE VITÓRIA 
    for (position of winPositions) {
      if (position.every((item) => items.includes(item))) {
        alert("O jogador '" + playerLastMove + "' ganhou o jogo!");
        initialize();
        return;
      }
    }
    // SE OS NOVE BOTÕES ESTIVEREM PREENCHIDOS SE NÃO HOUVER VENCEDOR ELE RETORNARÁ EMPATE
    if (selected.filter((item) => item).length === 9) {
      alert("DEU EMPATE!");
      initialize();
      return;
    }
}