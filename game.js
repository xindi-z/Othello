// done make board
// done make chess with color
// done make cell clickable
// done take turns to play
// keep score
// make chess reveres

// bugs:
// when theres space in between or when theres no same color on the other side

let turn = "black";
// get board
const board = document.getElementById("board");

// put cells into board
function createboard(){
    // let turn = "black";
    for(let i = 0; i < 64; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");

        // make cell clickable
        // when click, place a chess by color
        cell.addEventListener("click", function(){
            // if theres no chess played in cell yet and theres adjcent chess around
            if (!cell.querySelector(".chess") && hasAdjacentOpponent(cell, turn)) {
                if (flipChess(cell, turn)) {
                    cell.appendChild(createchess(turn));
                    updateScore();
                    turn = (turn === "black") ? "white" : "black";
                    document.querySelectorAll(".hint").forEach(h => h.remove()); // clean the hints
                    showHints(); // show new hints
                    setTimeout(gameover, 100);         // 🚨 让 Game Over 延迟一点点执行
                }
            }
        });
        
        board.appendChild(cell);

    }
}
// create chess
function createchess(color){
    let chess = document.createElement("div");
    chess.classList.add("chess", color);
    return chess;
}

// grab the cells, and add class name to them
// 27,28,35,36
function startboard(){
    Array.from(board.children).forEach(cell => {
        cell.innerHTML = ""; // 把每个 cell 里的棋子清空
    });
    document.getElementById("whitescore").innerHTML = "White: 2";
    document.getElementById("blackscore").innerHTML = "Black: 2";
    turn = "black";

    // create an element, add class name to the div
    board.children[27].appendChild(createchess("white"));
    board.children[28].appendChild(createchess("black"));
    board.children[35].appendChild(createchess("black"));
    board.children[36].appendChild(createchess("white"));
    showHints();
}

function updateScore(){
    
    let white = document.querySelectorAll(".white").length;
    let black = document.querySelectorAll(".black").length;
    // console.log(White: ${white}, Black: ${black});
    document.getElementById("whitescore").innerHTML = "White: " + white;
    document.getElementById("blackscore").innerHTML = "Black: " + black;
}

// check 8 directions to find same color chess
function flipChess(cell, color, simulate = false) {
    let directions = [-8, +8, -1, +1, -9, +9, -7, +7];
    let flipped = false;

    directions.forEach(offset => {
        if (checkDirection(cell, offset, color, simulate)) {
            flipped = true;
        }
    });
        if (flipped) {
        // 更新轮次显示
        updateTurnText();
    }

    return flipped;
}

// if find same color chess, stop looking
// if its space, stop looking
// if find oppsite color, continue looking, until you find same color chess.

// 1. chess can only be placed next to different color chess
// and 2. it has to flip at least one of the different color chess with same color chess
function checkDirection(cell, offset, color, simulate = false) {
    let flip = [];
    let index = Array.from(board.children).indexOf(cell);
    let current = cell;
    let opponentColor = color === "white" ? "black" : "white";
    let foundSameColor = false;

    while (true) {
        index += offset;

        if (index < 0 || index >= 64) break; // 出界
        if ((offset === 1 || offset === -7 || offset === 9) && index % 8 === 0) break; // 右边界
        if ((offset === -1 || offset === 7 || offset === -9) && (index + 1) % 8 === 0) break; // 左边界

        current = board.children[index];

        if (!current.firstChild) {
            return false; // 🚨 遇到空格直接废弃整条路径
        }

        if (current.firstChild.classList.contains(opponentColor)) {
            flip.push(current.firstChild); // 暂存要翻转的棋子
        } else if (current.firstChild.classList.contains(color)) {
            foundSameColor = true;
            break;
        } else {
            return false; // 空格直接退出
        }
    }

    if (foundSameColor && flip.length > 0) {
        if (!simulate) {
            flip.forEach(chess => {
                chess.classList.add("flipping");
                chess.classList.remove(opponentColor);
                chess.classList.add(color);
                setTimeout(() => {
                    chess.classList.remove("flipping");
                }, 400); 
            });
        }
        return true; // 只有路径合法才返回 true
    }

    return false;
}


// check if the cell is adjacent to an opponent's piece
// this to check if theres a different color chess in adjacent of the one you just played
// might be the problem here: that it didnt check if another side has a same color
function hasAdjacentOpponent(cell, color) {
    let directions = [-8, +8, -1, +1, -9, +9, -7, +7]; // 8 directions
    let opponentColor = color === "black" ? "white" : "black";

    let index = Array.from(board.children).indexOf(cell);

    for (let offset of directions) {
        let targetIndex = index + offset;

        // check if the target index is out of bounds
        if (targetIndex < 0 || targetIndex >= 64) continue;

        let targetCell = board.children[targetIndex];

        if (targetCell.firstChild && targetCell.firstChild.classList.contains(opponentColor)) {
            return true; // Found an adjacent opponent's piece
        }
    }
    return false; // No adjacent opponent's pieces found
}

function showHints() {
    // clean the hints
    Array.from(board.children).forEach(cell => {
        let hint = cell.querySelector(".hint");
        if (hint) {
            hint.remove();
        }
    });

    // find all the legitimate spot, and add the hint class to the chess
    Array.from(board.children).forEach(cell => {
        // if it havent been placed, has opponent chess near by, and the chess is flipable
        // then add hint class to the their div
        // if (!cell.querySelector(".chess") && flipChess(cell, turn, true)) {
        if (!cell.querySelector(".chess") && hasAdjacentOpponent(cell, turn) && flipChess(cell, turn, true)) {
            let hint = document.createElement("div");
            hint.classList.add("hint");
            if (turn === "white") {
                hint.classList.add("w");
            }
            cell.appendChild(hint);
        }
    });
}

// when the chess board is full, the one owns most chess wins
function gameover(){
    
    let white = document.querySelectorAll(".white").length;
    let black = document.querySelectorAll(".black").length;
    if (white + black == 64){
        if(white > black){
            alert("White wins")
        }
        else if(white < black){
            alert("Black wins")
        }
        else{
            alert("Tie")
        }
        startboard();
    }
}
let scoreboard = document.querySelector(".scoreboard");
let text = document.createElement("p");
scoreboard.appendChild(text);

function updateTurnText() {
    text.innerText = "Current: " + turn;
}



let restartBtn = document.createElement("button");
restartBtn.innerText = "Restart";
restartBtn.classList.add("restart-btn");
restartBtn.addEventListener("click", startboard);

// 把按钮直接塞到 scoreboard 里面
scoreboard.appendChild(restartBtn);



createboard();
startboard();
