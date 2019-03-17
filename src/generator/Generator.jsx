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

        this.insertWord();
        this.props.updateWordState(newInputValues);
    };

    componentDidMount() {
        this.buildBoard(20);
    }

    buildBoard = (size) => {
        const board = Array(size);
        for (let row = 0; row < size; row++) {
            board[row] = Array(size).fill("⬜");
        }

        this.props.updateBoard(board);
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

    insertWord = () => {
        let {inputValues, board} = this.props;
        const newBoard = board.map((row, i) => {
            console.info(row, i);
            return row.map(char => {
                return "A"
            });
        });
        // inputValues[0].word
        console.log(this.props.board[0][1]);

        this.props.updateBoard(newBoard)
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
