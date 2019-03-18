import React, {Component} from 'react';
import './View.scss';

class View extends Component {
    componentDidMount() {
        this.renderWordOntoRow();
    }

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

    renderWordOntoRow = (word) => {
        const {board, inputValues} = this.props;

        return inputValues.map(row => {
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

    renderCrossword = () => {
        const {board} = this.props;

        return board.map(row => {
            return (
                <div className="crossword-row">
                    {row.map(letter => (
                        <div className="crossword-letter">{letter}</div>
                    ))}
                </div>
            );
        });
    };

    render() {
        return (
            <section className="View">
                <div>{this.renderCrossword()}</div>
            </section>
        );
    }
}

export default View;
