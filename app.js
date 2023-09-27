const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Initialize dot properties
const dotRadius = 40;
const dotColor = 'rgb(255, 0, 0)'; // Red

// Variables for grid animation
let gridX = 0;
let gridY = 0;
const gridSize = 50;
const gridColor = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent black

// Speed at which the background moves
const backgroundSpeed = 4;

// Function to draw the dot at the center
function drawDot() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    ctx.closePath();
}

// Function to draw the grid
function drawGrid() {
    ctx.strokeStyle = gridColor;

    // Vertical lines
    for (let x = gridX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.closePath();
    }

    // Horizontal lines
    for (let y = gridY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.closePath();
    }
}

// Function to update the canvas
function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the background in the opposite direction of the mouse
    gridX += (centerX - gridX - mouseX) * backgroundSpeed / 1000;
    gridY += (centerY - gridY - mouseY) * backgroundSpeed / 1000;

    // Draw the grid
    drawGrid();

    // Draw the dot at the center
    drawDot();

    // Request animation frame
    requestAnimationFrame(update);
}

let mouseX = centerX;
let mouseY = centerY;

// Event listener for mousemove
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Start the animation
update();
