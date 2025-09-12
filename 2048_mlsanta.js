const blockContainer = document.querySelector(".blockContainer");
//보드 생성
for (let i = 1; i <= 16; i++) {
    const div = document.createElement("div");
    div.id = `block${i}`;
    div.className = "block";
    blockContainer.appendChild(div);
}
//초기 세팅
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let tableId = [];
for (let i = 0; i < 4; i++) {
    tableId[i] = [];
    for (let j = 0; j < 4; j++) {
        tableId[i][j] = `block${i * 4 + j + 1}`;
    }
}
let score = 0;
//업데이트
function update() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = document.getElementById(tableId[i][j]);
            cell.innerHTML = board[i][j] == 0 ? " " : board[i][j];
            // coloring(item);
        }
    }
    document.getElementById("score").innerHTML = score;
}
//이동
function mover(dir) {
    if (dir === 0) {
        move();
    } else if (dir === 1) {
        rotate(2);
        move();
        rotate(2);
    } else if (dir === 2) {
        rotate(1);
        move();
        rotate(3);
    } else if (dir === 3) {
        rotate(3);
        move();
        rotate(1);
    }
    update();
}
//키 입력
document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
        mover(0);
    } else if (e.key == "ArrowDown") {
        mover(1);
    } else if (e.key == "ArrowLeft") {
        mover(2);
    } else if (e.key == "ArrowRight") {
        mover(3);
    }
});

//초기설정
function init() {
    score = 0;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) board[i][j] = 0;

    for (let i = 0; i < 2; i++) {
        let rand = parseInt(Math.random() * 16);
        let x = rand % 4;
        let y = parseInt(rand / 4);

        if (board[y][x] == 0) {
            board[y][x] = getNewNum();
        } else {
            i--;
        }
    }
    update();
}

function coloring(item) {
    let cellNum = parseInt(item.innerHTML);
    if (cellNum == 0) {
        item.style.background = "wheat";
    } else if (cellNum == 2) {
        item.style.background = "red";
    } else if (cellNum == 4) {
        item.style.background = "blue";
    } else if (cellNum == 8) {
        item.style.background = "orange";
    } else if (cellNum == 16) {
        item.style.background = "perple";
    } else if (cellNum == 32) {
        item.style.background = "yellow";
    } else if (cellNum == 64) {
        item.style.background = "red";
    } else if (cellNum == 128) {
        item.style.background = "red";
    } else if (cellNum == 256) {
        item.style.background = "red";
    } else if (cellNum == 512) {
        item.style.background = "red";
    } else if (cellNum == 1024) {
        item.style.background = "red";
    } else if (cellNum == 2048) {
        item.style.background = "red";
    } else if (cellNum > 2048) {
        item.style.background = "black";
    }
}

//최대 점수 반환
function getMaxNum() {
    let ret = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] > ret) {
                ret = board[i][j];
            }
        }
    }
    return ret;
}
//보드판 회전
function rotate(n) {
    while (n--) {
        let tempBoard = board.map((row) => row.slice());
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[j][3 - i] = tempBoard[i][j];
            }
        }
    }
}
//숫자생성
function getNewNum() {
    let rand = parseInt(Math.random() * 10);
    if (rand == 0) return 4;
    return 2;
}
//보드판 이동
function move() {
    let isMoved = false;
    let isPlused = Array.from({ length: 4 }, () => [0, 0, 0, 0]);

    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (board[row][col] === 0) continue;

            let currentRow = row;
            while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                // 빈 칸으로 이동
                board[currentRow - 1][col] = board[currentRow][col];
                board[currentRow][col] = 0;
                currentRow--;
                isMoved = true;
            }

            // 병합 가능성 검사
            if (
                currentRow > 0 &&
                board[currentRow - 1][col] === board[currentRow][col] &&
                isPlused[currentRow - 1][col] === 0
            ) {
                board[currentRow - 1][col] *= 2;
                board[currentRow][col] = 0;
                score += board[currentRow - 1][col];
                isPlused[currentRow - 1][col] = 1;
                isMoved = true;
            }
        }
    }

    if (isMoved) {
        generate();
    } else {
        checkGameOver();
    }
}
//생성
function generate() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) emptyCells.push([i, j]);
        }
    }
    if (emptyCells.length === 0) return;
    let [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = getNewNum();
}

function checkGameOver() {
    for (let i = 0; i < 4; i++) {
        let colCheck = board[i][0];
        if (colCheck == 0) {
            return;
        }
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == colCheck || board[i][j] == 0) {
                return;
            } else {
                colCheck = board[i][j];
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        let rowCheck = board[0][i];
        if (rowCheck == 0) {
            return;
        }
        for (let j = 0; j < 4; j++) {
            if (board[j][i] == rowCheck || board[j][i] == 0) {
                return;
            } else {
                rowCheck = board[j][i];
            }
        }
    }
    gameover();
}

function gameover() {
    alert("[game over]\nMax" + getMaxNum() + "\nScore" + score);
    init();
}
//게임시작
init();
