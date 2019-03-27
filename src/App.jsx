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
        words: [{
            word: "banana",
            clue: "monkey treat",
        }, {
            word: "money",
            clue: "people want it",
        }],
    };

    updateWordState = (newInputValues) => {
        this.setState({words: newInputValues});
    };

    updateBoard = (newBoard) => {
        this.setState({board: newBoard});
    };

    render() {
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
