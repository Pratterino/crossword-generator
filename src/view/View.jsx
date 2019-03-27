import React, {Component} from 'react';
import './View.scss';

class View extends Component {
    componentDidMount() {
        this.renderWordOntoRow();
    }

    renderWordOntoRow = (word) => {
        const {words} = this.props;

        return words.map(row => {
            return (
                <div className="crossword-row">
                    <div className="crossword-letter">
                        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
                            <textfin
                                fontSize="20pt"
                                dy=".3em"
                            >{row.clue}</textfin>
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
                    {row.map(r => {
                        if (r.letter === ".") {
                            return (
                                <div className="crossword-letter block">{r.letter}</div>
                            );
                        }
                        return (
                            <div className={`crossword-letter ${r.letter === "." ? "block" : ""}`}>{r.letter}</div>
                        );
                    })}
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
