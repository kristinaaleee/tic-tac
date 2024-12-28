//gameboard object

//player object

//game flow object


//win conditions array.every etc.

function Gameboard(){
    // const board = new Array(3);
    // for (let i = 0; i < board.length; i++){
    //     board[i] = new Array(3).fill(Square());

    //     //try without fill, duplicating rows
    // };

    // definitely the fill function.... try something else >.<

    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
          board[i].push(Square());
        }
      }


    const getBoard = () => board;

    const printBoard = () =>{
        const updateBoard = board.map((row) => row.map((square) => square.getValue()))
        console.log(updateBoard);
    };

// currently filling whole row with same symbol

    const markSquare = (row, column, player) =>{
        rowIndex = row - 1;
        colIndex = column - 1;

        // console.log(board[rowIndex][colIndex])
        // if (board[rowIndex][colIndex] != undefined) return;

        board[rowIndex][colIndex].addSymbol(player);
    };

    return{getBoard, markSquare, printBoard};
};

function Square(){
    let value = "";

    const addSymbol = (player) =>{
        value = player;
    }
    const getValue = () => value;

    return {addSymbol, getValue};
}

function GameController(){
    const board = Gameboard();

    const players = [
        {
            name: 'Player 1',
            symbol: 'X'
        },
        {
            name: 'Player 2',
            symbol: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn. `);
    };

    const playRound = (row, column) =>{
        console.log(`${getActivePlayer().name} move into row ${row}, column ${column}.`);

        board.markSquare(row, column, getActivePlayer().symbol);

        switchPlayerTurn();
        printNewRound();
        };

        printNewRound();

    return{
        playRound, 
        getActivePlayer
    };
};

const game = GameController();






