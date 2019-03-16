import React, {Component} from 'react';
import './View.scss';

class View extends Component {
    renderCrosswordRow = (input) => {
        return input.map(row => {
            return (
                <div className="crossword-row">
                    <div className="crossword-letter">{
                        <svg viewBox="0 0 56 18">
                            <text
                                x="56"
                                y="18"
                            >{row.clue}</text>
                        </svg>
                    }</div>
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
