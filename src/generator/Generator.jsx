import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Generator.scss';

class Generator extends Component {
    handleChangeFor = (inputIndex, type) => (event) => {
        const {inputValues} = this.props;
        inputValues[inputIndex][type] = event.target.value;

        this.props.updateWordState(inputValues);
    };

    render() {
        const {inputValues} = this.props;

        return (
            <section className="Generator">
                Generator
                <div className="left">Word</div>
                <div className="right">Clue</div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {inputValues && inputValues.map((values, index) => (
                        <React.Fragment>
                            <input className="left" onChange={this.handleChangeFor(index, "word")} value={values.word}/>
                            <input className="right" onChange={this.handleChangeFor(index, "clue")}
                                   value={values.clue}/>
                        </React.Fragment>
                    ))}
                </form>
            </section>
        );
    }
}

Generator.propTypes = {
    updateWordState: PropTypes.func.isRequired,
};

export default Generator;
