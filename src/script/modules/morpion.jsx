import React from "react";

import "../../style/modules/morpion.css";

function defineWinner(board) {
    const rows = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const boardContent = board;

    for (let i = 0; i < rows.length; i++) {
        const [a,b,c] = rows[i];
        if (boardContent[a] !== null && boardContent[a] === boardContent[b] && boardContent[a] === boardContent[c]) {
            return boardContent[a];
        }
    }
    return null;
}

function Square (props) {
    return (
        <button 
            type="button" 
            className="shadow btn btn-light"
            onClick={props.onClick}
        >
            <b>{props.value}</b>
        </button>
    );
}

function WinnerAlert(props) {
    return (
        <div className="shadow alert" role="alert">
            {props.children}
        </div>
    );
}

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            squares: new Array(9).fill(null),
            isTheGameOver: false
        };
        this.handleReloadClick = this.handleReloadClick.bind(this);
    }

    handleSquareClick(squareIndex) {
        let player = this.state.xIsNext ? "X" : "O";
        let squaresUpdate = this.state.squares.slice();
        let gameStatus;

        if (squaresUpdate[squareIndex] !== null || this.state.isTheGameOver) {
            return null;
        } else {
            squaresUpdate[squareIndex] = player;
            gameStatus = defineWinner(squaresUpdate);

            if (gameStatus) {
                this.setState({
                    isTheGameOver: true
                });
            }

            this.setState({
                xIsNext: !this.state.xIsNext,
                squares: squaresUpdate
            });
        }
    }

    handleReloadClick(e) {
        this.setState({
            xIsNext: true,
            squares: new Array(9).fill(null),
            isTheGameOver: false
        });
        e.preventDefault();
    }

    render() {
        return (
            <div className="main-container">
                {this.state.isTheGameOver &&
                    <div id="winner-alert">
                        <WinnerAlert>
                            Le joueur {this.state.xIsNext ? "O" : "X"} gagne la partie !
                        </WinnerAlert>
                    </div>
                }
                <div id="board">
                    {this.state.squares.map((squareContent, index) =>
                        <Square 
                            value={squareContent} 
                            key={`square${index}`}
                            onClick={() => {this.handleSquareClick(index)}}
                        />
                    )}
                </div>
                {this.state.isTheGameOver &&
                    <div id="reload-button">
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.handleReloadClick}
                        >
                            Rejouer
                        </button>
                    </div>
                }
            </div>
        );
    }

}