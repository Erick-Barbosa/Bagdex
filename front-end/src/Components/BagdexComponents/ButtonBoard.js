import { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonBoard.css'

function animateClick(param) {
    if(!(param.target.className).includes("button"))
        return

    var delayInMilliseconds = 120;

    param.target.style.backgroundColor = "#010101"
    setTimeout(function() {
        param.target.style.backgroundColor = "#333333"
    }, delayInMilliseconds);
}

class ButtonBoard extends Component {

    goTo = (location) => {
        if(this.props.isLogged)
            this.props.navigate(location)
        else {
            alert("Você precisa estar logado!")
        }            
    }

    handleNextBagmon() {
        this.props.nextBagmon()
    }

    handlePreviousBagmon() {
        this.props.previousBagmon()
    }

    handleNextNature() {
        this.props.nextNature()
    }

    handlePreviousNature() {
        this.props.previousNature()
    }

    render(){
        return(
            <div className="board" onClick={e => animateClick(e)}>
                <div className="group">
                    <div id="round_button" className='button round a' onClick={e => this.goTo("/user")}>Perfil</div>

                    <div id="round_button" className='button round b' onClick={e => this.props.navigate("/dailyBagmon")}>Daily</div>

                    <div id="round_button" className='button round c' onClick={e => this.goTo("/listUser")}>Lista</div>

                </div>

                <div id="cross" >
                    <div id="leftcross" className='button' onClick={e => this.handlePreviousNature()}/>

                    <div id="topcross" className='button' onClick={e => this.handlePreviousBagmon()}/>

                    <div id="rightcross" className='button' onClick={e => this.handleNextNature()}/>

                    <div id="botcross" className='button' onClick={e => this.handleNextBagmon()}/>

                    <div id="midcross">
                        <div id="midCircle"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default function(props) {
    const navigate = useNavigate()

    return <ButtonBoard {...props} navigate={navigate}/>
}