import React, {Component} from 'react';
import './View.scss';

class View extends Component {
    renderCharacters = () => {
        if (this.props.inputValues.length) {
            return this.props.inputValues.map(input => (
                [...input.word].map(char => (
                    <div className="crossword-letter">{char}</div>
                ))
            ))
        }
    };

    render() {
        return (
            <section className="View">
                View
                <div>{this.renderCharacters()}</div>
            </section>
        );
    }
}

export default View;
