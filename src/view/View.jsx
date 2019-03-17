import React, {Component} from 'react';
import './View.scss';

class View extends Component {
    renderCrosswordRow = (input) => {
        return input.map(row => {
            return (
                <div className="crossword-row">
                    <div className="crossword-letter">
                        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
                            <text
                                fontSize="20pt"
                                dy=".3em"
                            >{row.clue}</text>
                        </svg>
                    </div>
                    {[...row.word].map(letter => (
                        <div className="crossword-letter">{letter}</div>
                    ))}
                </div>
            );
        })
    };

    displayBoard = () => {
        const board = this.props.board;
        let output = '';
        board.forEach(row => {
            row.forEach((letter) => {
                output += letter;
            });
            output += "\n";
        });
        return (
            <pre>{output}</pre>
        );
    };

    render() {

        return (
            <section className="View">
                <div>{this.displayBoard(20)}</div>
            </section>
        );
    }
}

export default View;
