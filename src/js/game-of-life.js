const canvas = document.getElementById("game-of-life");
const ctx = canvas.getContext("2d");

const existence_threshold = 0.85;
// Adjust canvas size dynamically
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CELL_SIZE = Math.floor(Math.random() * 15) + 15;
const ROWS = Math.floor(canvas.height / CELL_SIZE);
const COLS = Math.floor(canvas.width / CELL_SIZE);

// Initialize random grid
let grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => Math.random() > existence_threshold ? 1 : 0)
);

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === 1) {
                ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// Compute next generation
function nextGen() {
    let newGrid = grid.map(arr => [...arr]);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {

            // Detect number of live neighbors for each cell
            let liveNeighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    let nr = r + i, nc = c + j;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        liveNeighbors += grid[nr][nc];
                    }
                }
            }

            if (grid[r][c] === 1) {
                newGrid[r][c] = (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0;
            } else {
                newGrid[r][c] = (liveNeighbors === 3) ? 1 : 0;
            }
        }
    }
    grid = newGrid;
}

const duration = 300; // Adjust speed

function update() {
    nextGen();
    drawGrid();
    setTimeout(() => requestAnimationFrame(update), duration);
}

update(); // Start the animation