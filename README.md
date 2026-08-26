# Othello

A browser-based implementation of the classic **Othello (Reversi)** board game built with **JavaScript, HTML, and CSS**.

The project implements the core game logic from scratch, including legal move detection, directional piece flipping, turn management, scoring, move hints, and game-over detection.

## Features

- Interactive 8×8 Othello board
- Two-player local gameplay
- Automatic validation of legal moves
- Piece capture and flipping in all 8 directions
- Visual hints showing available moves
- Automatic score tracking
- Turn management between Black and White
- Automatic turn skipping when a player has no valid moves
- Win and tie detection
- Restart button and keyboard restart support
- Piece-flipping animations

## Tech Stack

- **JavaScript**
- **HTML5**
- **CSS3**

## Game Logic

The main challenge of the project was implementing Othello's move-validation and piece-flipping rules.

For each attempted move, the game checks all eight possible directions:

- Up
- Down
- Left
- Right
- Four diagonals

A move is valid when one or more opponent pieces are located between the newly placed piece and another piece of the current player's color.

The game then flips all captured pieces and updates the board state, score, available moves, and current turn.

## Move Hints

Before each turn, the game evaluates the board to determine all valid moves for the current player.

Valid positions are displayed as visual hints without modifying the actual game state. This allows players to quickly identify where they can legally place a piece.

## Turn Management

After every move, the game:

1. Updates the score
2. Switches the active player
3. Calculates the next player's available moves
4. Displays new move hints
5. Checks whether the next player's turn must be skipped
6. Checks for the end of the game

If a player has no valid moves, their turn is automatically skipped.

## What I Learned

This project gave me hands-on experience with:

- JavaScript DOM manipulation
- Event-driven programming
- Implementing board-game algorithms
- Searching across a two-dimensional game board
- Boundary and edge-case handling
- State and turn management
- Separating move simulation from actual game actions
- Debugging interactive application logic

## Running the Project

Clone the repository:

    git clone https://github.com/xindi-z/Othello.git

Open `index.html` in a web browser to start the game.

## Controls

- **Mouse:** Click a highlighted position to place a piece
- **Restart button:** Start a new game
- **R key:** Restart the game
