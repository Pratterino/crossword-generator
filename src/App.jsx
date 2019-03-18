import React, {Component} from 'react';
import View from "./view/View";
import Generator from "./generator/Generator";
import './App.scss';

class App extends Component {
    state = {
        board: [],
        options: {
            SIZE: 15,
        },
        inputValues: [{
            word: "banana",
            clue: "monkey treat",
        }, {
            word: "money",
            clue: "people want it",
        }, {
            word: "bagpipe",
            clue: "a so called \"sound vest\"",
        }, {
            word: "peppermint",
            clue: "a horrendous taste",
        }, {
            word: "peanuts",
            clue: "causes allergic reaction",
        }],
    };

    updateWordState = (newInputValues) => {
        this.setState({inputValues: newInputValues});
    };

    updateBoard = (newBoard) => {
        this.setState({board: newBoard});
    };

    render() {
        console.table(this.state.board);
        return (
            <div className="App">
                <View {...this.state}/>
                <hr/>
                <Generator
                    {...this.state}
                    updateBoard={this.updateBoard}
                    updateWordState={this.updateWordState}
                />
                <section>
                    <pre style={{textAlign: "left"}}>{JSON.stringify({...this.state, board: "=>"}, null, 2)}</pre>
                </section>
            </div>
        );
    }
}

export default App;
