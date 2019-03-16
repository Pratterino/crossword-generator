import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Generator.scss';

class Generator extends Component {
    handleChangeFor = (inputIndex, type) => (event) => {
        const {inputValues} = this.props;
        const newInputValues = [...inputValues];

        if (newInputValues[inputIndex]) {
            newInputValues[inputIndex][type] = event.target.value;
        } else {
            newInputValues.push({
                word: type === "word" ? event.target.value : "",
                clue: type === "clue" ? event.target.value : "",
            });
        }

        this.props.updateWordState(newInputValues);
    };

    renderCubeValue = (index, values) => {
        return (
            <div className="generator-pair">
                <input
                    type="text"
                    className="left"
                    onChange={this.handleChangeFor(index, "word")}
                    value={values.word}
                />

                <input
                    type="text"
                    className="right"
                    onChange={this.handleChangeFor(index, "clue")}
                    value={values.clue}
                />
            </div>
        );
    };

    renderInputRows() {
        const {inputValues} = this.props;
        if (!inputValues) {
            return null;
        }

        const newThing = inputValues.map((inputValue, index) => this.renderCubeValue(index, inputValue));

        return [
            ...newThing,
            this.renderCubeValue(inputValues.length, {}),
        ];
    }

    render() {

        return (
            <section className="Generator">
                <div className="generator-header">
                    <div className="left">Word</div>
                    <div className="right">Clue</div>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {this.renderInputRows()}
                </form>
            </section>
        );
    }
}

Generator.propTypes = {
    updateWordState: PropTypes.func.isRequired,
};

export default Generator;
