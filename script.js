//gameboard object

//player object

//game flow object


//win conditions array.every etc.

function Gameboard(){

    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
          board[i].push(Square());
        }
      }

    const getBoard = () => board;

    const printBoard = () =>{
        const updateBoard = board.map((row) => row.map((square) => square.getValue()));
        console.log(updateBoard);
    };

    const fullBoard = () =>{
        let availableSpaces = board.flatMap((row) => row.filter((square) => square.getValue() === ''));
        if (!availableSpaces.length) {
            return true;
        };
    }

    const markSquare = (row, column, player) =>{
        rowIndex = row - 1;
        colIndex = column - 1;

        board[rowIndex][colIndex].addSymbol(player);
    };

    return{getBoard, markSquare, printBoard, fullBoard};
};

function Square(){
    let value = "";

    const addSymbol = (player) =>{
        value = player;
    }

    const getValue = () => value;

    return {addSymbol, getValue};
};

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

    /// some are hard coded maybe update
    const checkWinner = () =>{
        for (let i = 0; i < 3; i++){
            if(board.getBoard()[i].every((val) => val.getValue() === getActivePlayer().symbol)){
                return true;
            }
            if(board.getBoard()[0][i].getValue() === getActivePlayer().symbol 
                && board.getBoard()[1][i].getValue() === getActivePlayer().symbol 
                && board.getBoard()[2][i].getValue() === getActivePlayer().symbol){
                return true;
            }
            if(board.getBoard()[0][0].getValue() === getActivePlayer().symbol 
                && board.getBoard()[1][1].getValue() === getActivePlayer().symbol 
                && board.getBoard()[2][2].getValue() === getActivePlayer().symbol){
                    return true;
            }
            if(board.getBoard()[0][2].getValue() === getActivePlayer().symbol 
            && board.getBoard()[1][1].getValue() === getActivePlayer().symbol 
            && board.getBoard()[2][0].getValue() === getActivePlayer().symbol){
                    return true;
            }
        }
        return false;
    };

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn. `);
    };

    const playRound = (row, column) =>{
        if (board.getBoard()[row-1][column-1].getValue() == ""){
        console.log(`${getActivePlayer().name} move into row ${row}, column ${column}.`);

        board.markSquare(row, column, getActivePlayer().symbol);

            if (checkWinner()){
                console.log(`${getActivePlayer().name} is the winner.`)
                board.printBoard();
                // add board reset
                return
            }

        switchPlayerTurn();
        printNewRound();

        }
        else {
            console.log('Invalid space. Try again')
            return
        };
        // console.log(board.fullBoard())
        if(board.fullBoard() === true){
            console.log("GAME OVER. It's a tie!")
            // add board reset
            return
        };
        };

        //initial game message
        printNewRound();

    return{
        playRound, 
        getActivePlayer
    };
};

const game = GameController();


