import { Component } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./Buttons/ButtonBack";
import ButtonSession from "./Buttons/ButtonSession";
import SessionLight from "./SessionLight";

import './PageDailyBagmon.css'

import calculateTime from '../Services/CalculateTime';
import ImageDailyBagmon from "./ImageDailyBagmon";
import DailyService from "../Services/DailyService";

const initialState = {
    time: calculateTime()
} 
class PageDailyBagmon extends Component {
    state = {...initialState}
    description = ""
    image = ""

    async componentDidMount () {
        this.timer = setInterval(() => {
            this.setState({ time: calculateTime() })
        }, 1000)

        var data = []
        this.description = localStorage.getItem("dailyBagmonDescription")
        this.image = localStorage.getItem("dailyBagmonImage")
        
        this.setState({dailyBagmon: data})
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    changeDailyBagmon() {
        DailyService.setDailyBagmon()
        localStorage.setItem("date", new Date())
        setTimeout(() => {
            window.location.reload()
        }, 1000) 
    }

    goTo = (location) => {
        this.props.navigate(location)
    }

    render() {
        //console.log(this.state.dailyBagmon)
        return (
          <div id="pokedex">
            <div id="left" >
                <div id="bg_curve1_left"/>
                <div id="bg_curve2_left"/>
                <div id="curve1_left">
                    <div id="buttonGlass">
                      <div id="reflect"/>
                    </div>
                    <SessionLight isLogged={this.props.isLogged}/>
                </div>
                <div id="curve2_left">
                    <ButtonSession text={this.props.text}/>
                    <ButtonBack/>
                </div>
                <div className="timer">
                    O Bagmón será trocado em {this.state.time}
                </div>
                
                <div className="bagmonBox">
                    {this.state.dailyBagmon ? this.description : "Nothing"}
                </div>
                <button className="changeBagmon" onClick={this.changeDailyBagmon}>🔄</button>
            </div>
            <div id="right">
                <div id="bg_curve1_right"/>
                <div id="bg_curve2_right"/>
                <div id="curve1_right">
                    <ImageDailyBagmon image={this.image}/>
                </div>
                <div id="curve2_right"/>
            </div>
          </div>
        )
    };
}

export default function(props) {
    const navigate = useNavigate()

    return <PageDailyBagmon {...props} navigate={navigate}/>
}