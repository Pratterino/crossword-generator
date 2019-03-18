import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Generator.scss';

class Generator extends Component {

    handleInputChange = (inputIndex, type) => (event) => {
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

    componentDidMount() {
        this.generateBoard();
        setTimeout(() => {
            this.props.inputValues.forEach(inputValue => {
                this.insertWord(inputValue.word);
            });
        }, 0);
    }


    generateBoard = () => {
        const {SIZE} = this.props.options;

        const board = Array(SIZE);
        for (let row = 0; row < SIZE; row++) {
            board[row] = Array(SIZE).fill(".");
        }

        this.props.updateBoard(board);
    };

    renderInputPair = (index, values) => {
        return (
            <div className="generator-pair">
                <input
                    type="text"
                    className="left"
                    onChange={this.handleInputChange(index, "word")}
                    value={values.word}
                />

                <input
                    type="text"
                    className="right"
                    onChange={this.handleInputChange(index, "clue")}
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

        const newThing = inputValues.map((inputValue, index) => this.renderInputPair(index, inputValue));

        return [
            ...newThing,
            this.renderInputPair(inputValues.length, {}),
        ];
    }

    insertWord = (word) => {
        let {board} = this.props;

        const rowNumber = Math.floor(Math.random() * board.length + 1);

        board.forEach((row, i) => {
            // the row we want to insert word into
            if (i === rowNumber) {
                row.forEach((letter, j) => {
                    if (j < word.length) {
                        board[i][j] = word[j];
                    }
                });
            }
            //let rowy2 = row.fill(inputValues[0].word[0], 0, inputValues[0].word.length);
        });

        this.props.updateBoard(board);
    };

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
    updateBoard: PropTypes.func.isRequired,
    updateWordState: PropTypes.func.isRequired,
};

export default Generator;
