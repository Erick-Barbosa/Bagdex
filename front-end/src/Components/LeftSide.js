import { Component } from 'react';
import ButtonBoard from './ButtonBoard';
import ImageScreen from './ImageScreen';

export default class LeftSide extends Component {
    
    handleNextBagmon() {
        console.log(this)
    }
    
    executeLog() {
        console.log(this.props)
    }

    render() {
    return (
        <div id="left" onClick={this.handleNextBagmon}>
            <div id="logo"></div>
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
                <div id="buttonGlass">
                <div id="reflect"> </div>
                </div>
                <div id="miniButtonGlass3"></div>
            </div>
            <div id="curve2_left">
            </div>
            <ImageScreen  ></ImageScreen>
            <ButtonBoard {...this.props}
            />
        </div>
    )}
}