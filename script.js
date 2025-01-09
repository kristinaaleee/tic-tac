function Gameboard(){

    const board = [];
    const newBoard = () => {
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
          board[i].push(Square());
        }
      }
    }
    newBoard();

    const getBoard = () => board;

    const printBoard = () =>{
        const updateBoard = board.map((row) => row.map((square) => square.getValue()));
        console.log(updateBoard);
    };

    // const fullBoard = () =>{
    //     let availableSpaces = board.flatMap((row) => row.filter((square) => square.getValue() === ''));
    //     if (!availableSpaces.length) {
    //         return true;
    //     };
    // }

    const markSquare = (row, column, player) =>{
        board[row][column].addSymbol(player);
    };

    return{getBoard, markSquare, printBoard, newBoard};
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

    const fullBoard = () =>{
        let availableSpaces = board.getBoard().flatMap((row) => row.filter((square) => square.getValue() === ''));
        if (!availableSpaces.length) {
            return true;
        };
    }

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
        if (board.getBoard()[row][column].getValue() == ""){
        console.log(`${getActivePlayer().name} move into row ${row}, column ${column}.`);

        board.markSquare(row, column, getActivePlayer().symbol);

            if (checkWinner()){
                console.log(`${getActivePlayer().name} is the winner.`)
                board.printBoard();
                return
            }

        switchPlayerTurn();
        printNewRound();

        }
        else {
            console.log('Invalid space. Try again')
            return
        };
        if(fullBoard()){
            console.log("GAME OVER. It's a tie!")
            return
        };
        };

        printNewRound();

    return{
        playRound, 
        getActivePlayer,
        checkWinner,
        fullBoard,
        switchPlayerTurn,
        getBoard: board.getBoard,
        newBoard: board.newBoard,
        players
    };
};

function ScreenController(){
    const game = GameController();
    const playerTurn = document.querySelector('.turn');
    const boardDisplay = document.querySelector('.board');
    const resetButton = document.querySelector('.reset');
    const confirmButton = document.querySelector('.confirm');
    const input = document.querySelectorAll('input');
    const form = document.querySelector('.form-container')

    //how to add this to alter player names that are previously set

    const updateScreen = () => {
        boardDisplay.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `${activePlayer.name}'s turn..`

        board.forEach((row, rowIndex) => {
            row.forEach((square, colIndex) =>{

                const squareButton = document.createElement('button');
                squareButton.classList.add('square')
                
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = colIndex;

                squareButton.textContent = square.getValue();
                boardDisplay.appendChild(squareButton);
            })
        })

        if (game.checkWinner()){
            playerTurn.textContent = `${activePlayer.name} is the winner!`
            return 'end'
        }

        if (game.fullBoard()){
            playerTurn.textContent = `GAME OVER! It's a tie.`
            return 'end'
        }
    }

    //event listener for board
    function clickHandlerBoard(e){
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedColumn || !selectedRow) return;

        game.playRound(selectedRow, selectedColumn);

        updateScreen();
        if (updateScreen() === 'end') {
            boardDisplay.removeEventListener('click', clickHandlerBoard);
        };
    }

    boardDisplay.addEventListener('click', clickHandlerBoard);

    resetButton.addEventListener('click', () =>{
        game.newBoard();
        if (game.getActivePlayer().symbol != 'X'){
            game.switchPlayerTurn();
        }
        boardDisplay.addEventListener('click', clickHandlerBoard);
        updateScreen();
        form.reset();
    });

    confirmButton.addEventListener('click', () => {
        const players = game.players;

        players[0].name = input[0].value
        players[1].name = input[1].value

        updateScreen();
    })

    updateScreen();
}

ScreenController();



