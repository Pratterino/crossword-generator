import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Generator.scss';

class Generator extends Component {
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    state = {
        words: this.shuffleArray(this.props.inputValues),
    };

    direction = {
        HORIZONTAL: "HORIZONTAL",
        VERTICAL: "VERTICAL",
    };

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
            const words = [...this.state.words];
            if (!words.length) {
                return false;
            }

            this.state.words.forEach((word, i) => {
                this.insertAWord(word, i % 2 ? this.direction.HORIZONTAL : this.direction.VERTICAL);
                // delete the placed word.
                words.splice(i, 1);
                this.setState({words});
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

    findWhereLetterExistsOnBoard = (event) => {
        const letter = event.target.value;
        const {board} = this.props;
        let matches = [];

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell.toLowerCase() === letter.toLowerCase()) {
                    matches.push({rowIndex, columnIndex});
                }
            });
        });

        return matches;
    };

    placeAWord = (word) => {
        [...word].forEach((letter, index) => {
            if (index >= 1 && index <= letter.length) {
                let matches = this.findWhereLetterExistsOnBoard({
                    target: {
                        value: letter,
                    }
                }) || [];

                // if any matches
                if (!!matches.length) {
                    console.info(`MATCHES: [${word}] (${letter}) ==>`, matches);
                } else {
                    console.info(`NO MATCHES: [${word}]`);
                    this.insertAWord(word, this.direction.HORIZONTAL)
                }
            }
        });

        // this.canPlaceLetterAt();
        // board[rowNumber].forEach((row, rowIndex) => {
//
        //         row.forEach((letter, columnIndex) => {
        //             if (letter === word[columnIndex]) {
        //                 console.info("MATCH => ", word[columnIndex], letter, `row: ${rowIndex}, col:${columnIndex}`);
        //                 startRowIndexForWord = rowIndex;
        //                 startColumnIndexForWord = columnIndex;
        //             }
        //             if (columnIndex < word.length) {
        //                 if (direction === this.direction.HORIZONTAL) {
        //                     board[startRowIndexForWord][startColumnIndexForWord + columnIndex] = word[columnIndex];
        //                 }
        //                 if (direction === this.direction.VERTICAL) {
        //                     board[columnIndex][startColumnIndexForWord] = word[columnIndex];
        //                 }
        //             }
        //         });
        //     }
        // })
    };

    canPlaceLetterAt = (row, column, letter) => {
        switch (this.props.board[row][column]) {
            case '.':
            case letter:
                return true;
            default:
                return false;
        }
    };

    insertAWord = (word, direction) => {
        let {board} = this.props;
        const rowNumber = Math.floor(board.length / 2);
        const columnStartIndex = Math.floor((board.length - word.word.length) / 2);

        board[rowNumber].forEach((cell, index) => {
            if (index < word.word.length) {
                if (direction === this.direction.HORIZONTAL) {
                    board[rowNumber][columnStartIndex + index] = word.word[index];
                } else {
                    board[columnStartIndex + index][rowNumber] = word.word[index];
                }
            }
        });
        console.error(board);
        this.props.updateBoard(board);
    };

    insertWords = (word, direction) => {
        let {board} = this.props;

        const rowNumber = Math.floor(Math.random() * board.length);

        board.forEach((row, rowIndex) => {
            // the row we want to insert word into
            if (rowIndex === rowNumber) {
                const columnStart = Math.floor(Math.random() * (board[rowNumber].length - (word.length - 1)));
                let startRowIndexForWord = rowNumber;
                let startColumnIndexForWord = columnStart;

                row.forEach((letter, columnIndex) => {
                    if (columnIndex < word.length) {
                        if (direction === this.direction.HORIZONTAL) {
                            board[startRowIndexForWord][startColumnIndexForWord + columnIndex] = word[columnIndex];
                        }
                        if (direction === this.direction.VERTICAL) {
                            board[columnIndex][startColumnIndexForWord] = word[columnIndex];
                        }
                    }
                });
            }
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

                <input onChange={this.findWhereLetterExistsOnBoard} maxLength={1}/>
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
