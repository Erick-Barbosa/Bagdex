import './ButtonBoard.css'
import { Component } from 'react';

function animateClick(param) {
    if(param.target.className == "")
        return

    var delayInMilliseconds = 120;

    param.target.style.backgroundColor = "#010101"
    setTimeout(function() {
        param.target.style.backgroundColor = "#222"
    }, delayInMilliseconds);
}

class ButtonBoard extends Component {

    handleNextBagmon() {
        this.props.nextBagmon()
    }

    handlePreviousBagmon() {
        this.props.previousBagmon()
    }

    render(){
        return(
            <div className="board">
                <div className="button_group">
                    <div id="button_right" onClick={e => this.handleGet()}><strong>B</strong></div>

                    <div id="button_left"><strong>D</strong></div>

                    <div id="button_top"><strong>A</strong></div>

                    <div id="button_bottom"><strong>C</strong></div>
                </div>

                <div id="cross" onClick={e => animateClick(e)}>
                    <div className="leftcross">
                    </div>

                    <div className="topcross" onClick={e => this.handlePreviousBagmon()}>
                    </div>

                    <div className="rightcross">
                    </div>

                    <div className="botcross" onClick={e => this.handleNextBagmon()}>
                    </div>

                    <div id="midcross">
                        <div id="midCircle"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ButtonBoard;