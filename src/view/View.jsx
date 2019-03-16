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

    render() {
        const {inputValues} = this.props;

        return (
            <section className="View">
                <div>{this.renderCrosswordRow(inputValues)}</div>
            </section>
        );
    }
}

export default View;
