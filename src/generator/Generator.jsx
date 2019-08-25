import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
        words: this.props.words,
    };

    direction = {
        HORIZONTAL: "HORIZONTAL",
        VERTICAL: "VERTICAL",
    };

    handleInputChange = (inputIndex, type) => (event) => {
        const {words} = this.props;
        const newInputValues = [...words];

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
                if (i === 0) {
                    const randomDirection = Math.floor(Math.random() * Object.keys(this.direction).length);
                    this.insertFirstWord(word, randomDirection % 2 ? this.direction.HORIZONTAL : this.direction.VERTICAL);
                } else {
                    //this.insertAWord(word, offsetedCoordinates)
                    this.placeAWord(word);
                }
                // delete the placed word.
                words.splice(i, 1);
                this.setState({words});
            });
        }, 0);
    }

    generateCellValue = (cell) => {
        return {
            word: "",
            letter: ".",
            letterIndex: 0,
            row: 0,
            column: 0,
            direction: null,
            clue: null,
            ...cell,
        }
    };

    generateBoard = () => {
        const {SIZE} = this.props.options;

        const board = Array(SIZE).fill(null);
        board.forEach((row, i) => board[i] = Array(SIZE).fill(this.generateCellValue({row: i})));
        board.forEach((row, rowIndex) => {
            board[rowIndex].forEach((column, columnIndex) => {
                board[rowIndex][columnIndex] = this.generateCellValue({
                    row: rowIndex,
                    column: columnIndex,
                });
            })
        });

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
        const {words} = this.props;
        if (!words) {
            return null;
        }

        const newThing = words.map((inputValue, index) => this.renderInputPair(index, inputValue));

        return [
            ...newThing,
            this.renderInputPair(words.length, {}),
        ];
    }

    findWhereLetterExistsOnBoard = (letter) => {
        const {board} = this.props;
        let matches = [];

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell.letter.toLowerCase() === letter.toLowerCase()) {
                    matches.push({
                        letter,
                        rowIndex,
                        columnIndex,
                        cell,
                    });
                }
            });
        });

        return matches;
    };

    canBePlaced = (word) => {
        console.info(">>>", word);
    };

    placeAWord = (word) => {
        let matches = null;

        [...word.word].forEach((letter, index) => {
                const _matches = this.findWhereLetterExistsOnBoard(letter);
                if (_matches.length) {
                    matches = {
                        word,
                        letter,
                        matches: _matches.map(match => ({
                            ...match,
                            index,
                            startRowIndex: match.rowIndex,
                            startColumnIndex: match.columnIndex,
                        })),
                    };
                }
                this.canBePlaced(matches);
        });

        // if any matches
        if (matches) {
            console.info(`MATCHES: [${word.word}] ==>`, matches);
            let wordToInsert = _.sample(matches.matches);
            const invertedDirectionOfMatch = this.getInvertedDirection(wordToInsert.cell.direction);
            this.insertAWord(word, invertedDirectionOfMatch, {
                row: invertedDirectionOfMatch === this.direction.HORIZONTAL ? wordToInsert.startRowIndex : wordToInsert.startColumnIndex ,
                column: invertedDirectionOfMatch === this.direction.HORIZONTAL ? wordToInsert.startColumnIndex - wordToInsert.index : wordToInsert.startRowIndex,
            });
        } else {
            console.error(`No match for word ${word.word}!`);
            //this.insertAWord(word.word, this.direction.HORIZONTAL)
        }
    };

    getInvertedDirection = (direction) => {
        return direction === this.direction.HORIZONTAL ? this.direction.VERTICAL : this.direction.HORIZONTAL;
    };

    insertFirstWord = (word, direction) => {
        let {board} = this.props;
        const rowNumber = 2;
        const columnStartIndex = 2;

        board[rowNumber].forEach((cell, index) => {
            if (index < word.word.length) {
                if (direction === this.direction.HORIZONTAL) {
                    board[rowNumber][columnStartIndex + index] = this.generateCellValue({
                        direction,
                        row: rowNumber,
                        column: columnStartIndex + index,
                        letter: word.word[index],
                    });
                } else {
                    board[columnStartIndex + index][rowNumber] = this.generateCellValue({
                        direction,
                        row: rowNumber,
                        column: columnStartIndex + index,
                        letter: word.word[index],
                    });
                }
            }
        });
        console.error(board);
        this.props.updateBoard(board);
    };

    insertAWord = (word, direction, coordinates) => {
        let {board} = this.props;
        const rowNumber = coordinates.row;
        const columnStartIndex = coordinates.column;

        board[rowNumber].forEach((cell, index) => {
            if (index < word.word.length) {
                if (direction === this.direction.HORIZONTAL) {
                    board[rowNumber][columnStartIndex + index] = this.generateCellValue({
                        direction,
                        row: rowNumber,
                        column: columnStartIndex + index,
                        letter: word.word[index],
                    });
                } else {
                    board[columnStartIndex + index][rowNumber] = this.generateCellValue({
                        direction,
                        row: rowNumber,
                        column: columnStartIndex + index,
                        letter: word.word[index],
                    });
                }
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
