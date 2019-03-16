import React, {Component} from 'react';
import View from "./view/View";
import Generator from "./generator/Generator";
import './App.scss';

class App extends Component {
    state = {
        inputValues: [],
    };

    updateWordState = (newInputValues) => {
        this.setState({inputValues: newInputValues});
    };


    render() {
        return (
            <div className="App">
                <View inputValues={this.state.inputValues}/>
                <hr/>
                <Generator
                    inputValues={this.state.inputValues}
                    updateWordState={this.updateWordState}
                />
            </div>
        );
    }
}

export default App;
